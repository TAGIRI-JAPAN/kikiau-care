// Original scene artwork. Teaching scripts remain the source for exact details.
const files:Record<string,string>={
 meal:'meal-conversation',wardrobe:'wardrobe',phone:'family-call',shogi:'shogi-friends',
 festival:'festival-memory',evening:'evening-room',outing:'garden-outing',craft:'craft-table',
 lounge:'listening-lounge',memory:'shared-memory',blanket:'blanket-and-jacket',
};
const shortScenes:Record<string,string>={
 blanket:'lounge',tea:'meal',window:'lounge',glasses:'shogi',light:'lounge',tissue:'lounge',
 garden:'outing',thanks:'wardrobe',home:'memory',song:'festival',refuse:'outing',family:'phone',
 notwater:'meal',later:'wardrobe',left:'shogi',yesterday:'meal',daughter:'memory',condition:'outing',
 pain:'lounge',dizzy:'lounge',toilet:'lounge',heard:'lounge',notfinish:'meal',handover:'phone',
 napkin:'meal',cardigan:'wardrobe',laundry:'wardrobe','cup-handle':'meal',radio:'lounge',cushion:'lounge',
 festival:'festival',shogi:'shogi',recipe:'meal','weather-chat':'outing',craft:'craft','pet-memory':'memory',
 appointment:'outing','visit-time':'phone','phone-who':'phone','return-book':'shogi','towel-colour':'wardrobe','after-tea':'meal',
 'missing-item':'wardrobe',privacy:'evening','night-light':'evening',slowly:'lounge',noise:'lounge','staff-message':'phone',
};
const longScenes:Record<string,string>={
 'garden-chat':'memory','photo-chat':'memory','tea-jacket':'meal','outing-plan':'outing','phone-message':'phone','three-people':'craft','meal-choice':'meal','laundry-day':'wardrobe',
 'phone-plan':'phone','shogi-chat':'shogi','festival-chat':'festival','evening-check':'evening',
};
export function lessonArt(id:string,kind:'short'|'dialogue'='short'){
 const key=(kind==='short'?shortScenes:longScenes)[id]||'lounge';
 return `./print-art/${files[key]}.webp`;
}
