import getClient from "../config/elasticSearch.config";

interface ILog {
    appName: string,
    function: string,
    body: any
}

export async function createLog(log: ILog ) {
    console.log(log)
    const data = await getClient().index({
        index: log.appName.toLowerCase(),
        type: log.function,
        body: log.body,
      });

    return data
}