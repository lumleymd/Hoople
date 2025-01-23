import axios from "axios";
import neo4j from 'neo4j-driver'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });

const driver = neo4j.driver(process.env.NEO_PATH, neo4j.auth.basic(process.env.NEO_USERNAME, process.env.NEO_PASSWORD))
const session = driver.session()

//lowest is 85
//reamresults come in at 92
let year = 1985;
let current = 2024;

let teams = [
    'bos', 'bkn', 'ny', 'phi', 'tor',
    'den', 'min', 'okc', 'por', 'utah',
    'chi', 'cle', 'det', 'ind', 'mil',
    'gs', 'lac', 'lal', 'phx', 'sac',
    'atl', 'cha', 'mia', 'orl', 'wsh',
    'dal', 'hou', 'mem', 'no', 'sa'
]



export async function createDb() {


    try {

        for (year; year <= current; year++) {
            for (let t = 0; t < teams.length; t++) {
                let url = `https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${teams[t]}/athletes/statistics?season=${year}`;

                let response = await axios.get(url, {}).catch(function (error) { });

                if (response && response.status == 200) {

                    let data = response.data
                    let team = data.team
                    let overallStats = data.results[0].leaders

                    for (let j = 0; j < overallStats.length; j++) {
                        let p = overallStats[j]
                        let player = {
                            id: p.athlete.id,
                            name: p.athlete.displayName,
                            position: p.athlete.position.displayName,

                        }

                        let playerStats = p.statistics[0]
                        playerStats.stats.forEach((stat) => {
                            player[stat.name] = stat.value
                        })
                        //I'm just now learning about graph databases, be nice
                        const result = await session.run(
                            `MERGE (t:Team {name:"${team.displayName}",logo:"${team.logo}"})
                          MERGE (a:Athlete {name:"${player.name}"})
                          CREATE (a)-[:PLAYED_ON {
                            espnId:${player.id},
                            year:"${year}",
                            position:"${player.position}",
                            avgRebounds:${player.avgRebounds},
                            assistTurnoverRatio:${player.assistTurnoverRatio},
                            avgFouls:${player.avgFouls},
                            gamesPlayed:${player.gamesPlayed},
                            minutes:${player.minutes},
                            avgMinutes:${player.avgMinutes},
                            totalRebounds:${player.totalRebounds}, 
                            record:"${team.recordSummary}",
                            standing:"${team.standingSummary}"
                          }]->(t)
                          RETURN t,a`
                        )
                    }
                }
            }
        }

    } finally {
        await session.close()
    }
    await driver.close()
}




createDb();
