//                    ______
//                 .-"      "-.
//                /            \
//   _           |              |          _
//   ( \         |,  .-.  .-.  ,|         / )
//   > "=._      | )(__/  \__)( |     _.=" <
//   (_/"=._"=._ |/     /\     \| _.="_.="\_)
//          "=._ (_     ^^     _)"_.="
//              "=\__|IIIIII|__/="
//             _.="| \IIIIII/ |"=._
//   _     _.="_.="\          /"=._"=._     _
//  ( \_.="_.="     `--------`     "=._"=._/ )
//  > _.="                            "=._ <
//  (_/                                    \_)

/**
 * Model of the different sicknesses
 * @export
 * @class Sicknesses
 */
export class Sicknesses 
{
    /**
     * Id of the sickness
     * @private
     * @type {number}
     * @memberof Sicknesses
     */
    private id: number = -1;
    /**
     * Scientific name of the sickness
     * @private
     * @type {string}
     * @memberof Sicknesses
     */
    private name: string = "";
    /**
     * Common name of the sickness
     * @private
     * @type {string}
     * @memberof Sicknesses
     */
    private commonName: string = "";
    /**
     * Symptoms of the sickness
     * @private
     * @type {string}
     * @memberof Sicknesses
     */
    private symptoms: string = "";
    /**
     * Description of the illness
     *
     * @private
     * @type {string}
     * @memberof Sicknesses
     */
    private description: string = "";
    /**
     * Rarity of the sickness
     * @private
     * @type {number}
     * @memberof Sicknesses
     */
    private rarity: number = -1;
    /**
     * How severe the sickness is
     * @private
     * @type {number}
     * @memberof Sicknesses
     */
    private severity: number = -1;
    /**
     * How to treat the sickness if there is no cure
     * @private
     * @type {string}
     * @memberof Sicknesses
     */
    private treatment: string = "";
    /**
     * What pre existing conditions the sickness is strong against
     * @private
     * @type {string}
     * @memberof Sicknesses
     */
    private strongAgainst: string = "";
    /**
     * The requirements of the illness such as gender or previous conditions
     *
     * @private
     * @type {string}
     * @memberof Sicknesses
     */
    private requirements: string = "";
    /**
     * The common targets such as age
     *
     * @private
     * @type {string}
     * @memberof Sicknesses
     */
    private commonTargets: string = "";

    /**
     * Sickness Constructor
     * @constructor
     * @param id Id of the sickness
     * @param name Scientific name of the sickness
     * @param commonName Common name of the sickness
     * @param symptoms Symptoms of the sickness
     * @param description Description of the sickness
     * @param rarity Rarity of the sickness
     * @param severity How severe the sickness is
     * @param treatment How to treat the sickness if there is no cure
     * @param strongAgainst What pre existing conditions the sickness is strong against
     * @param requirements The things required for a user to have the sickness
     * @param commonTargets The people the sickness commonly affects
     */
    constructor(id:number, name:string, commonName:string, symptoms:string, description:string, rarity:number, severity:number, treatment:string, strongAgainst:string, requirements:string, commonTargets:string)
    {
        this.id = id;
        this.name = name;
        this.commonName = commonName;
        this.symptoms = symptoms;
        this.description = description;
        this.rarity = rarity;
        this.severity = severity;
        this.treatment = treatment;
        this.strongAgainst = strongAgainst;
        this.requirements = requirements;
        this.commonTargets = commonTargets;
    }

    //=-=-=-=-=-=-=-=-=-=-=
    //Getters and Setters
    //=-=-=-=-=-=-=-=-=-=-=
    /**
     * Method to get the ID of a sickness
     *
     * @type {number}
     * @memberof Sicknesses
     */
    get Id():number
    {
        return this.id;
    }
    /**
     * Method to set the ID of a sickness
     *
     * @memberof Sicknesses
     */
    set Id(id:number)
    {
        this.id = id;
    }

    /**
     * Method to get the name of a sickness
     *
     * @type {string}
     * @memberof Sicknesses
     */
    get Name():string
    {
        return this.name;
    }
    /**
     * Method to set the name of a sickness
     *
     * @memberof Sicknesses
     */
    set Name(name:string)
    {
        this.name = name;
    }

    /**
     * Method to get the common name of a sickness
     *
     * @type {string}
     * @memberof Sicknesses
     */
    get CommonName():string
    {
        return this.commonName;
    }
    /**
     * Method to set the common name of a sickness
     *
     * @memberof Sicknesses
     */
    set CommonName(commonName:string)
    {
        this.commonName = commonName;
    }

    /**
     * Method to get the symptoms of a sickness
     *
     * @type {string}
     * @memberof Sicknesses
     */
    get Symptoms():string
    {
        return this.symptoms;
    }
    /**
     * Method to set the symptoms of a sickness
     *
     * @memberof Sicknesses
     */
    set Symptoms(symptoms:string)
    {
        this.symptoms = symptoms;
    }

    /**
     * Method to get the description of a sickness
     *
     * @type {string}
     * @memberof Sicknesses
     */
    get Description():string
    {
        return this.description;
    }
    /**
     * Method to set the description of a sickness
     *
     * @memberof Sicknesses
     */
    set Description(description:string)
    {
        this.description = description;
    }

    /**
     * Method to get the rarity of a sickness
     *
     * @type {number}
     * @memberof Sicknesses
     */
    get Rarity():number
    {
        return this.rarity;
    }
    /**
     * Method to set the rarity of a sickness
     *
     * @memberof Sicknesses
     */
    set Rarity(rarity:number)
    {
        this.rarity = rarity;
    }

    /**
     * Method to get the severity of a sickness
     *
     * @type {number}
     * @memberof Sicknesses
     */
    get Severity():number
    {
        return this.severity;
    }
    /**
     * Method to set the severity of a sickness
     *
     * @memberof Sicknesses
     */
    set Severity(severity:number)
    {
        this.severity = severity;
    }

    /**
     * Method to get the treatment for a sickness
     *
     * @type {string}
     * @memberof Sicknesses
     */
    get Treatment():string
    {
        return this.treatment;
    }
    /**
     * Method to set the treatment for a sickness
     *
     * @memberof Sicknesses
     */
    set Treatment(treatment:string)
    {
        this.treatment = treatment;
    }

    /**
     * Method to get the strong against for a sickness
     *
     * @type {string}
     * @memberof Sicknesses
     */
    get StrongAgainst():string
    {
        return this.strongAgainst;
    }
    /**
     * Method to set the strong against for a sickness
     *
     * @memberof Sicknesses
     */
    set StrongAgainst(strongAgainst: string)
    {
        this.strongAgainst = strongAgainst;
    }

    /**
     * Method to get the sickness requirements
     *
     * @type {string}
     * @memberof Sicknesses
     */
    get Requirements():string
    {
        return this.requirements;
    }
    /**
     * Method to set the sickness requirements
     *
     * @memberof Sicknesses
     */
    set Requirements(requirements:string)
    {
        this.requirements = requirements;
    }

    /**
     * Method to get the sickness common targets
     *
     * @type {string}
     * @memberof Sicknesses
     */
    get CommonTargets():string
    {
        return this.commonTargets;
    }
    /**
     * Method to set the sickness common targets
     *
     * @memberof Sicknesses
     */
    set CommonTargets(commonTargets:string)
    {
        this.commonTargets = commonTargets;
    }
}