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
     * The cure for the sickness
     * @private
     * @type {string}
     * @memberof Sicknesses
     */
    private cure: string = "";
    /**
     * How to treat the sickness if there is no cure
     * @private
     * @type {string}
     * @memberof Sicknesses
     */
    private treatment: string = "";
    /**
     * Natural treatments for the sickness
     * @private
     * @type {string}
     * @memberof Sicknesses
     */
    private naturalTreatment: string = "";
    /**
     * What pre existing conditions the sickness is strong against
     * @private
     * @type {string}
     * @memberof Sicknesses
     */
    private strongAgainst: string = "";

    /**
     * Sickness Constructor
     * @constructor
     * @param id Id of the sickness
     * @param name Scientific name of the sickness
     * @param commonName Common name of the sickness
     * @param symptoms Symptoms of the sickness
     * @param rarity Rarity of the sickness
     * @param severity How severe the sickness is
     * @param cure The cure for the sickness
     * @param treatment How to treat the sickness if there is no cure
     * @param naturalTreatment Natural treatments for the sickness
     * @param strongAgainst What pre existing conditions the sickness is strong against
     */
    constructor(id:number, name:string, commonName:string, symptoms:string, rarity:number, severity:number, cure:string, treatment:string, naturalTreatment:string, strongAgainst:string)
    {
        this.id = id;
        this.name = name;
        this.commonName = commonName;
        this.symptoms = symptoms;
        this.rarity = rarity;
        this.severity = severity;
        this.cure = cure;
        this.treatment = treatment;
        this.naturalTreatment = naturalTreatment;
        this.strongAgainst = strongAgainst;
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
     * Method to get the cure of a sickness
     *
     * @type {string}
     * @memberof Sicknesses
     */
    get Cure():string
    {
        return this.cure;
    }
    /**
     * Method to set the cure of a sickness
     *
     * @memberof Sicknesses
     */
    set Curt(cure:string)
    {
        this.cure = cure;
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
     * Method to get the natural treatment for a sickness
     *
     * @type {string}
     * @memberof Sicknesses
     */
    get NaturalTreatment():string
    {
        return this.naturalTreatment;
    }
    /**
     * Method to set the natural treatment for a sickness
     *
     * @memberof Sicknesses
     */
    set NaturalTreatment(naturalTreatment:string)
    {
        this.naturalTreatment = naturalTreatment;
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
}