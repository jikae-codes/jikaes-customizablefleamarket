
// Made by Jikae | Big ups to chomp


import { DependencyContainer } from "tsyringe";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import { LogBackgroundColor } from "@spt-aki/models/spt/logging/LogBackgroundColor";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

class Mod implements IPostDBLoadMod, IPreAkiLoadMod
{
    private config = require("../config/config.json");


    public preAkiLoad(container: DependencyContainer): void {
        //get logger
        const logger = container.resolve<ILogger>("WinstonLogger");
        logger.success("Customizing your Flea Market!");
    }

    public postDBLoad(container: DependencyContainer): void {
        
        // get logger
        const logger = container.resolve<ILogger>("WinstonLogger");
        logger.info("Loaded Database... Time to customize");
        this.load_customized_fleamarket(container);

    }



    public load_customized_fleamarket(container: DependencyContainer): void {

            // get database from server
            const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
            const logger = container.resolve<ILogger>("WinstonLogger");
            const tables = databaseServer.getTables();

            tables.globals.config.RagFair.minUserLevel = this.config.min_flea_level;
            tables.globals.config.RagFair.isOnlyFoundInRaidAllowed = this.config.isfound_in_raid_only;
            tables.globals.config.RagFair.priceStabilizerEnabled = this.config.price_stabilizer;
    }




    

    /*
    public postAkiLoad(container: DependencyContainer): void {
        // get logger
        const logger = container.resolve<ILogger>("WinstonLogger");

        // log the 'myProperty' value to the console
        logger.info(`here is the value from my config: ${this.modConfig.myProperty}`);
    }
    */
}

module.exports = { mod: new Mod() }