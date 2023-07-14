
export interface TBeer{
    id: number;
    name: string;
    tagline: string;
    first_brewed: string;
    description: string;
    image_url: string;
    abv: number;
    ibu: number;
    target_fg: number;
    target_og: number;
    ebc: number;
    srm: number;
    ph: number;
    attenuation_level: number;
    volume: Property
    boil_volume: Property
    method: {
        mast_temp:{
            temp:Property;
            duration:number;
        }[];
        fermentation:{
            temp:Property;
        }
    };
    ingredients: {
        malt:Ingradient[];
        hops:HopIngradient[];
        yeast:string;
    },
    food_pairing: string[],
    brewers_tips: string,
    contributed_by: string
}

interface Property {
    value:number;
    unit:string;
}

interface Ingradient{
    name:string;
    amount:Property;
}
interface HopIngradient extends Ingradient{
    add: string;
    attribute: string;
}