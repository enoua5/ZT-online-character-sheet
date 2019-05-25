var autosave={};
var saves={};

function save_as(what,check=true)
{
  if(!what)
    return;
  if(check)
  {
    if(what in saves)
      if(!confirm("'"+what+"' already exists. Are you sure you want to replace it?"))
        return;
  }
  
  autosave.id=what;
  
  saves[what]=JSON.parse(JSON.stringify(autosave));
  //delete saves[what].id;
  
  localStorage.e5_zt_cs_saves=JSON.stringify(saves);
  
  alert("Saved! (Probably. I didn't actually bother to check.)");
}
function save_normal()
{
  save_as(autosave.id, false);
}

function reset_autosave()
{
  autosave={
    //where it gets saved to if "save" is clicked
    id:undefined,
    //roll play vars
    name:"",
    player:"",
    appear:["",""],
    personality:["",""],
    ideals:["",""],
    motives:["",""],
    flaws:["",""],
    //statbox
    hp:"",
    mana:"",
    fatigue:"",
    max_hp:"",
    hunger:false,
    armor:"",
    speed:"",
    //skill points
    points_spent:"",
    points_total:"",
    skills:[
      /*res:*/{score:"",die:""},
      /*str:*/{score:"",die:""},
      /*ath:*/{score:"",die:""},
      /*dex:*/{score:"",die:""},
      
      /*wil:*/{score:"",die:""},
      /*prc:*/{score:"",die:""},
      /*log:*/{score:"",die:""},
      /*kno:*/{score:"",die:""},
      
      /*spr:*/{score:"",die:""},
      /*chr:*/{score:"",die:""},
      /*per:*/{score:"",die:""},
      /*dec:*/{score:"",die:""}
    ],
    
    attacks:[
      {name:"",special:"",hit_attr:"",hit_bon:"",dmg_attr:"",dmg_bon:"",range:"",bc:""},
      {name:"",special:"",hit_attr:"",hit_bon:"",dmg_attr:"",dmg_bon:"",range:"",bc:""},
      {name:"",special:"",hit_attr:"",hit_bon:"",dmg_attr:"",dmg_bon:"",range:"",bc:""},
      {name:"",special:"",hit_attr:"",hit_bon:"",dmg_attr:"",dmg_bon:"",range:"",bc:""}
    ],
    
    spells:[
      {mana:"",name:"",desc:""},
      {mana:"",name:"",desc:""},
      {mana:"",name:"",desc:""},
      {mana:"",name:"",desc:""},
      {mana:"",name:"",desc:""},
      {mana:"",name:"",desc:""},
      {mana:"",name:"",desc:""},
      {mana:"",name:"",desc:""},
      {mana:"",name:"",desc:""},
      {mana:"",name:"",desc:""}
    ],
    
    feat_cost:"",
    
    feats:"",
    
    deats:"",
    
    notes:""
  };
  
  load_from_auto();
  localStorage.e5_zt_cs_autosave=JSON.stringify(autosave);
}

function g(what)
{
  return document.getElementById(what);
}
function q(sel)
{
  return document.querySelectorAll(sel);
}

function do_autosave()
{
  
  g("save_button").disabled=(autosave.id==undefined);
  g("save_button").innerText=!!autosave.id?"Save to "+autosave.id:"Save";
    

  let a=q("#details input");
  autosave.name=a[0].value;
  autosave.player=a[1].value;
  autosave.appear[0]=a[2].value;
  autosave.appear[1]=a[3].value;
  autosave.personality[0]=a[4].value;
  autosave.personality[1]=a[5].value;
  autosave.ideals[0]=a[6].value;
  autosave.ideals[1]=a[7].value;
  autosave.motives[0]=a[8].value;
  autosave.motives[1]=a[9].value;
  autosave.flaws[0]=a[10].value;
  autosave.flaws[1]=a[11].value;

  autosave.hp=q("#hp input")[0].value;
  autosave.mana=q("#mana input")[0].value;
  autosave.armor=q("#armor input")[0].value;
  autosave.max_hp=q("#max_hp input")[0].value;
  autosave.max_hp=q("#max_hp input")[0].value;
  autosave.fatigue=q("#fatigue input")[0].value;
  autosave.hunger=q("#hunger input")[0].checked;
  autosave.speed=q("#speed input")[0].value;
  
  autosave.points_spent=g("skill-spent").value;
  autosave.points_total=g("skill-total").value;
  
  a=q("#abilities input");
  let j=0;
  for(let i=0; i<a.length; i+=2)
  {
    autosave.skills[j].score=a[i].value;
    autosave.skills[j].die=a[i+1].value;
    j++;
  }
  
  let attk=q("#actions .box")[0].querySelectorAll("table tbody tr");
  for(let i=1; i<attk.length; i++)
  {
    let stats=attk[i].querySelectorAll("td input");
    autosave.attacks[i-1].name=stats[0].value;
    autosave.attacks[i-1].special=stats[1].value;
    autosave.attacks[i-1].hit_attr=stats[2].value;
    autosave.attacks[i-1].hit_bon=stats[3].value;
    autosave.attacks[i-1].dmg_attr=stats[4].value;
    autosave.attacks[i-1].dmg_bon=stats[5].value;
    autosave.attacks[i-1].range=stats[6].value;
    autosave.attacks[i-1].bc=stats[7].value;
  }
  
  spells=q("#actions .box")[1].querySelectorAll("table tbody tr");
  for(let i=1; i<spells.length; i++)
  {
    let stats=spells[i].querySelectorAll("td input");
    autosave.spells[i-1].mana=stats[0].value;
    autosave.spells[i-1].name=stats[1].value;
    autosave.spells[i-1].desc=stats[2].value;
  }
  
  autosave.feat_cost=g("costs").value;
  autosave.feats=g("feats").value;
  autosave.deats=g("deats").value;
  autosave.notes=g("notes").value;

  localStorage.e5_zt_cs_autosave=JSON.stringify(autosave);
}

function load_from_auto()
{
  let a=document.querySelectorAll("#details input");
  a[0].value=autosave.name;
  a[1].value=autosave.player;
  a[2].value=autosave.appear[0];
  a[3].value=autosave.appear[1];
  a[4].value=autosave.personality[0];
  a[5].value=autosave.personality[1];
  a[6].value=autosave.ideals[0];
  a[7].value=autosave.ideals[1];
  a[8].value=autosave.motives[0];
  a[9].value=autosave.motives[1];
  a[10].value=autosave.flaws[0];
  a[11].value=autosave.flaws[1];

  q("#hp input")[0].value=autosave.hp;
  q("#mana input")[0].value=autosave.mana;
  q("#armor input")[0].value=autosave.armor;
  q("#max_hp input")[0].value=autosave.max_hp;
  q("#max_hp input")[0].value=autosave.max_hp;
  q("#fatigue input")[0].value=autosave.fatigue;
  q("#hunger input")[0].checked=autosave.hunger;
  q("#speed input")[0].value=autosave.speed;
  
  g("skill-spent").value=autosave.points_spent;
  g("skill-total").value=autosave.points_total;
  
  a=q("#abilities input");
  let j=0;
  for(let i=0; i<a.length; i+=2)
  {
    a[i].value=autosave.skills[j].score;
    a[i+1].value=autosave.skills[j].die;
    j++;
  }
  
  let attk=q("#actions .box")[0].querySelectorAll("table tbody tr");
  for(let i=1; i<attk.length; i++)
  {
    let stats=attk[i].querySelectorAll("td input");
    stats[0].value=autosave.attacks[i-1].name;
    stats[1].value=autosave.attacks[i-1].special;
    stats[2].value=autosave.attacks[i-1].hit_attr;
    stats[3].value=autosave.attacks[i-1].hit_bon;
    stats[4].value=autosave.attacks[i-1].dmg_attr;
    stats[5].value=autosave.attacks[i-1].dmg_bon;
    stats[6].value=autosave.attacks[i-1].range;
    stats[7].value=autosave.attacks[i-1].bc;
  }
  
  spells=q("#actions .box")[1].querySelectorAll("table tbody tr");
  for(let i=1; i<spells.length; i++)
  {
    let stats=spells[i].querySelectorAll("td input");
    stats[0].value=autosave.spells[i-1].mana;
    stats[1].value=autosave.spells[i-1].name;
    stats[2].value=autosave.spells[i-1].desc;
  }
  
  g("costs").value=autosave.feat_cost;
  g("feats").value=autosave.feats;
  g("deats").value=autosave.deats;
  g("notes").value=autosave.notes;
}
