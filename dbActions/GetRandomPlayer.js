import FileSystem from "fs";
import neo4j from 'neo4j-driver'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });

const driver = neo4j.driver(process.env.NEO_PATH, neo4j.auth.basic(process.env.NEO_USERNAME, process.env.NEO_PASSWORD))
const session = driver.session()

export async function getPlayer() {


    try {

        const IdRequest = await session.run("MATCH (a:Athlete) RETURN MAX(ID(a))")
        let min = 0
        let max = IdRequest.records[0]._fields[0].low
        let random = Math.floor(Math.random() * (max - min + 1)) + min

        const playerRequest = await session.run(`MATCH  (a:Athlete )-[r:PLAYED_ON]->(t:Team) WHERE ID(a) = ${random} AND (a)-[:PLAYED_ON]->(t) RETURN a,t,r`)

        let player = {}
        player.teams = []

        for (let p = 0; p < playerRequest.records.length; p++) {

            let record = playerRequest.records[p]
            let relation = record._fields

            player.name = relation[0].properties.name
            player.espnId = relation[2].properties.espnId.low
            player.teams.push({
                id: relation[1].identity.low,
                name: relation[1].properties.name,
                totalRebounds: relation[2].properties.totalRebounds.low,
                avgFouls: relation[2].properties.avgFouls,
                assistTurnoverRatio: relation[2].properties.assistTurnoverRatio,
                avgMinutes: relation[2].properties.avgMinutes,
                avgRebounds: relation[2].properties.avgRebounds,
                gamesPlayed: relation[2].properties.gamesPlayed.low,
                year: relation[2].properties.year,
                minutes: relation[2].properties.minutes.low,
                position: relation[2].properties.position,
                logo: relation[1].properties.logo,
                record: relation[2].properties.record,
                standing: relation[2].properties.standing,
                mates: []
            })

            for (let k = 0; k < player.teams.length; k++) {
                let tea = player.teams[k];

                const teammatesRequest = await session.run(`MATCH  (a:Athlete )-[r:PLAYED_ON {year:"${tea.year}"}]->(t:Team) WHERE ID(t)=${tea.id} RETURN a`)

                teammatesRequest.records.forEach((mate) => {
                    let tm = mate._fields
                    tea.mates.push(tm[0].properties.name)
                })
            }
        }

        FileSystem.writeFile('../src/staticFiles/player.json', JSON.stringify(player), (error) => {
            if (error) throw error;
        })

    } finally {
        await session.close()
    }
    await driver.close()
}




getPlayer();
