import FileSystem from "fs";
import neo4j from 'neo4j-driver'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });

const driver = neo4j.driver(process.env.NEO_PATH, neo4j.auth.basic(process.env.NEO_USERNAME, process.env.NEO_PASSWORD))
const session = driver.session()

export async function getPlayer() {

  
    try {

        const ARequest = await session.run("MATCH (a:Athlete) RETURN a ORDER BY a.name")
      
        let nodes = ARequest.records
        let players = []

        nodes.forEach((node)=>{
      
            players.push(node._fields[0].properties.name)
        })

        FileSystem.writeFile('../src/staticFiles/allPlayers.json', JSON.stringify(players), (error) => {
           if (error) throw error;
        })


    } finally {
        await session.close()
    }
    await driver.close()
}




getPlayer();
