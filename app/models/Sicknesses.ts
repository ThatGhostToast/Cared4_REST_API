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

//Model of the different sicknesses
export class Sicknesses 
{
    //Id of the sickness
    private id: number = -1;
    //Scientific name of the sickness
    private name: string = "";
    //Common name of the sickness
    private commonName: string = "";
    //Symptoms of the sickness
    private symptoms: string = "";
    //Rarity of the sickness
    private rarity: number = -1;
    //How severe the sickness is
    private severity: number = -1;
    //The cure for the sickness
    private cure: string = "";
    //How to treat the sickness if there is no cure
    private treatment: string = "";
    //Natural treatments for the sickness
    private naturalTreatment: string = "";
    //What pre existing conditions the sickness is strong against
    private strongAgainst: string = "";

    //Constructor
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
    get Id():number
    {
        return this.id;
    }
    set Id(id:number)
    {
        this.id = id;
    }

    get Name():string
    {
        return this.name;
    }
    set Name(name:string)
    {
        this.name = name;
    }

    get CommonName():string
    {
        return this.commonName;
    }
    set CommonName(commonName:string)
    {
        this.commonName = commonName;
    }

    get Symptoms():string
    {
        return this.symptoms;
    }
    set Symptoms(symptoms:string)
    {
        this.symptoms = symptoms;
    }

    get Rarity():number
    {
        return this.rarity;
    }
    set Rarity(rarity:number)
    {
        this.rarity = rarity;
    }

    get Severity():number
    {
        return this.severity;
    }
    set Severity(severity:number)
    {
        this.severity = severity;
    }

    get Cure():string
    {
        return this.cure;
    }
    set Curt(cure:string)
    {
        this.cure = cure;
    }

    get Treatment():string
    {
        return this.treatment;
    }
    set Treatment(treatment:string)
    {
        this.treatment = treatment;
    }

    get NaturalTreatment():string
    {
        return this.naturalTreatment;
    }
    set NaturalTreatment(naturalTreatment:string)
    {
        this.naturalTreatment = naturalTreatment;
    }

    get StrongAgainst():string
    {
        return this.strongAgainst;
    }
    set StrongAgainst(strongAgainst: string)
    {
        this.strongAgainst = strongAgainst;
    }
}