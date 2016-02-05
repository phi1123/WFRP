
////////// GLOBAL VARIABLES  //////////

var allRaces = {Dwarf:"Dwarf",Elf:"Elf",Halfling:"Halfling",Human:"Human"};
var raceChosen = false;
var allPrimaryAttributes = {WS:"WS",BS:"BS",S:"S",T:"T",Ag:"Ag",Int:"Int",WP:"WP",Fel:"Fel"};
var primaryAttributesChosen = false;
var highPrimaryAttributes = false;
var allSecondaryAttributes = {A:"A",W:"W",SB:"SB",TB:"TB",M:"M",Mag:"Mag",IP:"IP",FP:"FP"};
var secondaryAttributesChosen = false;
var logged = false;
var tempSkill = "";
var tempTalent = "";
var tempTalent1 = "";
var tempTalent2 = "";
var tempCareer = "";

var careerSkillChoices=[];
var careerTalentChoices=[];

var skillsGlobal = [];
var talentsGlobal = [];
var globalFreeRaise="";

var careerCount = 0;
var rolledCareers = [];
var careers = [
               {
            	   "label":"Agitator",	//0
            		"mainAdvancements": ["WS","BS","Ag","Int","Fel"],
            		"secondaryAdvancements": ["W"],
            		"choices": {
            			"hasSkillChoice": true,
            			"skillChoices": [
            			                 ["Academic Knowledge \[History\]","Gossip"],
            					         ["Academic Knowledge \[Law\]","Common Knowledge \[Empire\]"],
            					         ["Speak Language \[Breton\]","Speak Language \[Tilean\]"]
            			],
            			"hasTalentChoice": true,
            			"talentChoices": [
            					          ["Coolheaded","Streetfighting"]
            			]
            		},
            		"skills": ["Concealment","Charm","Perception","Read\/Write","Speak Language \[Reikspiel\]"],
            		"talents": ["Flee\!","Public Speaking"],
            		"trappings": ["Leather Jack","Good Clothes","Leaflets"]
               }, 			
               {
            	   	"label":"Apprentice Wizard",	//1
           			"mainAdvancements": ["Ag","Int","WP","Fel"],
           			"secondaryAdvancements": ["W","Mag"],
           			"choices": {
           				"hasSkillChoice": false,
           				"skillChoice": [],
           				"hasTalentChoice": true,
           				"talentChoices": [
            					          ["Savvy","Very Resilient"],
            					          ["Aethyric Attunement","Fast Hands"]
            			]
					},
					"skills": ["Academic Knowledge \[Magic\]","Channeling","Magical Sense","Perception","Read\/Write","Search","Speak Arcane Language \[Magick\]","Speak Language \[Classical\]"],
					"talents": ["Petty Magic"],
					"trappings": ["Quarter Staff","Backpack","Printed Book"]
               }, 
               {
           	   	"label":"Bailiff",	//2
          			"mainAdvancements": ["WS","BS","S","Int","WP","Fel"],
          			"secondaryAdvancements": ["W"],
          			"choices": {
          				"hasSkillChoice": true,
          				"skillChoices": [
          				                 	["Animal Care","Gossip"],
          				                 	["Command","Navigation"],
          				                 	["Intimidate","Common Knowledge \[The Empire\]"]
          				                 ],
          				"hasTalentChoice": true,
          				"talentChoices": [
          				                  	["Etiquette","Super Numerate"]
           					          	 ]
					},
					"skills": ["Academic Knowledge \[Law\]","Charm","Perception","Read\/Write","Ride"],
					"talents": ["Public Speaking"],
					"trappings": ["Leather Jack","Leather Skullcap","Riding Horse with Saddle and Harness","Good Clothing"]
              },
              {
             	   	"label":"Barber-Surgeon",	//3
            			"mainAdvancements": ["WS","Ag","Int","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 	["Drive","Swim"],
            				                 	["Speak Language \[Breton\]","Speak Language \[Reikspiel\]","Speak Language \[Tilean\]"]
            				                ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  	["Resistance to Disease","Savvy"],
            				                  	["Suave","Very Resilient"]
            				 ]
  					},
  					"skills": ["Charm","Haggle","Heal","Perception","Read\/Write","Trade \[Apothecary\]"],
  					"talents": ["Surgery"],
  					"trappings": ["Trade Tools \[Barber-Surgeon\]"]
                },	
                {
             	   	"label":"Boatman",		//4
            			"mainAdvancements": ["WS","BS","S","T","Ag","Int"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 	["Common Knowledge \[The Empire\]","Common Knowledge \[Kislev\]"],
            				                 	["Consume Alcohol","Gossip"],
            				                 	["Secret Language \[Ranger\]","Speak Language \[Kislevian\]"],
            				                 ],
            				"hasTalentChoice": false,
            				"talentChoices": []
  					},
  					"skills": ["CNavigation","Outdoor Survival","Perception","Row","Sail","Swim"],
  					"talents": ["Orientation","Seasoned Traveler"],
  					"trappings": ["Leather Jack","Row Boat"]
                },		
                {
             	   	"label":"Bodyguard",	//5
            			"mainAdvancements": ["WS","S","T","Ag"],
            			"secondaryAdvancements": ["A","W"],
            			"choices": {
            				"hasSkillChoice": false,
            				"skillChoices": [],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  	["Disarm","Quick Draw"],
            				                  	["Very Strong","Very Resilient"]
            				 ]
  					},
  					"skills": ["Dodge Blow","Heal","Intimidate","Perception"],
  					"talents": ["Specialist Weapon Group \[Parrying\]","Specialist Weapon Group \[Throwing\]","Street Fighting","Strike to Stun"],
  					"trappings": ["Buckler","Knuckle Dusters","A Pair of Throwing Weapons of Choice","Leather Jack"]
                },			
                {
             	   	"label":"Bone Picker",		//6
            			"mainAdvancements": ["WS","S","T","Ag","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Charm","Gossip"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Coolheaded","Streetwise"],
            				                  ["Hardy","Resistance to Disease"]
            				 ]
  					},
  					"skills": ["Animal Care","Drive","Common Knowledge \[The Empire\]","Evaluate","Haggle","Perception","Search"],
  					"talents": ["Surgery"],
  					"trappings": ["Cart, 3 Sacks"]
                },		
                {
             	   	"label":"Bounty Hunter",		//7
            			"mainAdvancements": ["WS","BS","S","Ag","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": false,
            				"skillChoices": [],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				              ["Marksman","Strike to Stun"],
            				              ["Sharpshooter","Strike Mighty Blow"]
            				 ]
  					},
  					"skills": ["Follow Trail","Intimidate","Outdoor Survival","Perception","Search","Shadowing","Silent Move"],
  					"talents": ["Rover","Specialist Weapon Group \[Entangling\]"],
  					"trappings": ["Crossbow with 10 Bolts","Net","Leather Jerkin","Leather Skullcap","Manacles","10 Yards of Rope"]
                },		
                {
             	   	"label":"Burgher",		//8
            			"mainAdvancements": ["WS","Ag","Int","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 	["Common Knowledge \[The Empire\]","Consume Alcohol"],
            				                 	["Gossip","Read\/Write"],
            				                 	["Speak Language \[Breton\]","Speak Language \[Kislevian\]","Speak Language \[Tilean\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  	["Savvy","Suave"]
            				                  ]
  					},
  					"skills": ["Drive","Evaluate","Haggle","Perception","Search","Speak Language \[Reikspiel\]"],
  					"talents": ["Dealmaker"],
  					"trappings": ["Abacus","Lantern","Good Clothing"]
                },			
                {
             	   	"label":"Camp Follower",		//9
            			"mainAdvancements": ["T","Ag","Int","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 	["Animal Care","Drive"],
            				                 	["Charm","Evaluate"],
            				                 	["Trade \[Armourer\]","Trade \[Bowyer\]","Trade \[Cartographer\]","Trade \[Cook\]","Trade \[Gunsmith\]","Trade \[Herbalist\]","Trade \[Merchant\]","Trade \[Smith\]","Trade \[Tailor\]","Trade \[Weaponsmith\]"],
            				                 	["Speak Language \[Breton\]","Speak Language \[Kislevian\]","Speak Language \[Tilean\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  	["Dealmaker","Street Fighter"],
            				                  	["Hardy","Suave"],
            				                  	["Resistance to Disease","Seasoned Traveller"]
            				                  ]
  					},
  					"skills": ["Gossip","Haggle","Perception","Search","Speak Language \[Reikspiel\]","Sleight of Hand"],
  					"talents": ["Flee\!"],
  					"trappings": ["Lucky Charm or Trade Tools","Pouch","Tent"]
                },		
                {
             	   	"label":"Charcoal Burner",	//10
            			"mainAdvancements": ["WS","S","T","Ag","Int","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 	["Common Knowledge \[The Empire\]","Concealment"],
            				                 	["Gossip","Drive"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  	["Savvy","Very Strong"]
            				                  ]
  					},
  					"skills": ["Haggle","Outdoor Survival","Perception","Scale Sheer Surface","Search","Secret Signs \[Ranger\]"],
  					"talents": ["Flee\!"],
  					"trappings": ["3 Torches","Tinderbox","Hatchet"]
                },
                {
             	   	"label":"Coachman",	//11
            			"mainAdvancements": ["WS","BS","Ag","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 	["Heal","Ride"],            				                 	
            				                 	["Gossip","Drive"],
            				                 	["Speak Language \[Breton\]","Speak Language \[Kislevian\]","Speak Language \[Tilean\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  	["Quick Draw","Seasoned Traveller"]
            				                  ]
  					},
  					"skills": ["Animal Care","Navigation","Perception","Secret Signs \[Ranger\]"],
  					"talents": ["Specialist Weapon Group \[Gunpowder\]"],
  					"trappings": ["Blunderbuss","Ammunition for 10 Shots","Mail Shirt","Leather Jack","Instrument \[Coach Horn\]"]
                },
                {
             	   	"label":"Entertainer",	//12
            			"mainAdvancements": ["WS","BS","Ag","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 	["Animal Care","Swim"],            				                 	
            				                 	["Gossip","Evaluate"],
            				                 	["Animal Training","Blather","Charm Animal", "Hypnotism","Ride","Scale Sheer Surface","Sleight of Hand","Ventriloquism"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  	["Mimic","Public Speaking","Sharpshooter","Trick Riding","Wrestling"],
            				                  	["Lightning Reflexes","Quick Draw","Specialist Weapon Group \[Throwing\]","Very Strong"]
            				                  ]
  					},
  					"skills": ["Charm","Common Knowledge \[The Empire\]","Perception","Speak Language \[Reikspiel\]"],
  					"talents": ["Specialist Weapon Group \[Gunpowder\]"],
  					"trappings": ["Leather Jerkin","Instrument","3 Throwing Knives","Costume or Good Clothes"]
                },
                {
             	   	"label":"Envoy",	//13
            			"mainAdvancements": ["WS","BS","Ag","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 	["Common Knowledge \[The Empire\]","Common Knowledge \[The Wasteland\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  	["Dealmaker","Seasoned Traveler"]
            				                  ]
  					},
  					"skills": ["Charm","Evaluate","Gossip","Haggle","Perception","Read\/Write","Secret Language \[Guild Tongue\]","Swim","Trade \[Merchant\]"],
  					"talents": [],
  					"trappings": ["Leather Jack","2 sets of Good Clothes","Writing Kit"]
                },
                {
             	   	"label":"Estalian Diestro",		//14
            			"mainAdvancements": ["WS","S","T","Ag","Int"],
            			"secondaryAdvancements": ["A","W"],
            			"choices": {
            				"hasSkillChoice": false,
            				"skillChoices": [],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  	["Lightning Reflexes","Swashbuckler"],
            				                  	["Quick Draw","Strike to Injure"]
            				                  ]
  					},
  					"skills": ["Academic Knowledge \[Science\]","Common Knowledge \[Estalia\]","Dodge Blow","Read\/Write","Speak Language \[Estalian\]"],
  					"talents": ["Specialist Weapon Group \[Fencing\]","Strike Mighty Blow"],
  					"trappings": ["Foil or Rapier","Best Clothes","Perfume or Cologne","Healing Draught"]
                },
                {
             	   	"label":"Ferryman",		//15
            			"mainAdvancements": ["WS","S","T","Ag","Int"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Evaluate","Secret Language \[Ranger Tongue\]"],
            				                 ["Gossip","Intimidate"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  	["Marksman","Suave"],
            				                  	["Specialist Weapon Group \[Gunpowder\]","Street Fighting"]
            				                  ]
  					},
  					"skills": ["Charm","Common Knowledge \[The Empire\]","Haggle","Perception","Row","Swim"],
  					"talents": [],
  					"trappings": ["Crossbow with 10 Bolts or Blunderbuss with ammunition for 10 shots","Leather Jack"]
                },
                {
             	   	"label":"Fieldwarden",		//16
            			"mainAdvancements": ["WS","BS","T","Ag","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Academic Knowledge \[Necromancy\]","Common Knowledge \[The Empire\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  	["Fleet Footed","Savvy"],
            				                  	["Mihty Shot","Rapid Reload"],
            				                  	["Rover","Quick Draw"]
            				                  ]
  					},
  					"skills": ["Concealment","Follow Trail","Outdoor Survival","Perception","Search","Silent Move"],
  					"talents": [],
  					"trappings": ["Sling with Ammunition","Lantern","Lamp Oil","Spade","Pony with Saddle and Harness"]
                },
                {
             	   	"label":"Fisherman",		//17
            			"mainAdvancements": ["BS","S","T","Ag","Int"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Common Knowledge \[The Wasteland\]","Common Knowledge \[The Empire\]"],
            				                 ["Consume Alcohol","Haggle"],
            				                 ["Navigation","Trade \[Merchant\]"],
            				                 ["Speak Language \[Reikspiel\]","Speak Language \[Norse\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  	["Hardy","Savvy"],
            				                  	["Orientation","Street Fighting"]
            				                  ]
  					},
  					"skills": ["Outdoor Survival","Perception","Row","Sail","Swim"],
  					"talents": [],
  					"trappings": ["Sling with Ammunition","Lantern","Lamp Oil","Spade","Pony with Saddle and Harness"]
                },
                {
             	   	"label":"Grave Robber",		//18
            			"mainAdvancements": ["WS","BS","S","Ag","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Gossip","Haggle"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  	["Streetwise","Strongminded"]
            				                  ]
  					},
  					"skills": ["Drive","Perception","Scale Sheer Surface","Search","Secret Signs \[Thief\]","Silent Move"],
  					"talents": ["Flee\!","Resistance to Disease"],
  					"trappings": ["Lantern","Lamp Oil","Pick","Sack","Spade"]
                },
                {
             	   	"label":"Hedge Wizard",		//19
            			"mainAdvancements": ["T","Ag","Int","WP","Fel"],
            			"secondaryAdvancements": ["W","Mag"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Animal Care","Haggle"],
            				                 ["Charm","Intimidate"],
            				                 ["Charm Animal","Trade \[Apothecary\]"],
            				                 ["Heal","Hypnotism"]
            				                 ],
            				"hasTalentChoice": false,
            				"talentChoices": []
  					},
  					"skills": ["Channeling","Magical Sense","Perception","Search"],
  					"talents": ["Hedge Magic","Petty Magic"],
  					"trappings": ["Healing Draught","Hood"]
                },
                {
             	   	"label":"Hunter",		//20
            			"mainAdvancements": ["BS","T","Ag","Int"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Search","Swim"],
            				                 ["Silent Move","Set Trap"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  	["Hardy","Specialist Weapon Group \[Longbow\]"],
            				                  	["Lightning Reflexes","Very Resilient"],
            				                  	["Marksman","Rover"]
            				                  ]
  					},
  					"skills": ["Concealment","Follow Trail","Outdoor Survival","Perception","Secret Signs \[Ranger\]"],
  					"talents": ["Rapid Reload"],
  					"trappings": ["Longbow iwth 10 Arrows","2 Animal Traps","Antitoxin Kit"]
                },
                {
             	   	"label":"Initiate",		//21
            			"mainAdvancements": ["WS","BS","T","Int","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Academic Knowledge \[Astronomy\]","Academic Knowledge \[History\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  	["Lightning Reflexes","Very Strong"],
            				                  	["Suave","Warrior Born"]
            				                  ]
  					},
  					"skills": ["Academic Knowledge \[Theology\]","Charm","Heal","Perception","Read\/Write","Speak Language \[Classical\]","Speak Language \[Reikspiel\]"],
  					"talents": ["Public Speaking"],
  					"trappings": ["Religious Symbol","Robes"]
                },
                {
             	   	"label":"Jailer",		//22
            			"mainAdvancements": ["WS","S","T","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Heal","Sleight of Hand"]
            				                 ],
            				"hasTalentChoice": false,
            				"talentChoices": []
  					},
  					"skills": ["Command","Consume Alcohol","Dodge Blow","Intimidate","Perception","Search"],
  					"talents": ["Resistance to Disease","Resistance to Poison","Specialist Weapon Group \[Entangling\]","Wrestling"],
  					"trappings": ["Bottle of Common Wine","Tankard","Bola, Lasso or Net"]
                },
                {
             	   	"label":"Kislevite Kossar",		//23
            			"mainAdvancements": ["WS","BS","T","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Gamble","Gossip"]
            				                 ],
            				"hasTalentChoice": false,
            				"talentChoices": []
  					},
  					"skills": ["Common Knowledge \[Kislev\]","Consume Alcohol","Dodge Blow","Outdoor Survival","Perception","Search","Speak Language \[Kislevian\]"],
  					"talents": ["Specialist Weapon Group \[Two-Handed\]","Strike to Injure"],
  					"trappings": ["Bow with 10 Arrows","Great Weapon \[Two Handed Axe\]","Mail Coat","Leather Jacket","Leather Leggings"]
                },
                {
             	   	"label":"Kithband Warrior",		//24
            			"mainAdvancements": ["WS","BS","Ag","Int","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Heal","Search"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Marksman","Rover"],
            				                  ["Rapid Reload","Warrior Born"]
            				                  ]
  					},
  					"skills": ["Concealment","Dodge Blow","Follow Trail","Outdoor Survival","Perception","Scale Sheer Surface","Silent Move"],
  					"talents": [],
  					"trappings": ["Elfbow with 10 Arrows","Leather Jack"]
                },
                {
             	   	"label":"Marine",		//25
            			"mainAdvancements": ["WS","BS","S","Ag","WP"],
            			"secondaryAdvancements": ["A","W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Common Knowledge \[The Wasteland\]","Gamble"],
            				                 ["Gossip","Secret Language \[Battle Tongue\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Disarm","Quick Draw"]
            				                  ]
  					},
  					"skills": ["Consume Alcohol","Dodge Blow","Intimidate","Row","Swim"],
  					"talents": ["Strike Mighty Blow","Strike to Stun"],
  					"trappings": ["Bow or Crossbow with 10 Arrows or Bolts","Leather Jack","Shield","Grappling Hook","10 Yards of Rope"]
                },
                {
             	   	"label":"Mercenary",		//26
            			"mainAdvancements": ["WS","BS","S","T","Ag","WP"],
            			"secondaryAdvancements": ["A","W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Animal Care","Gamble"],
            				                 ["Common Knowledge \[Bretonnia\]","Common Knowledge \[Kislev\]","Common Knowledge \[Tilea\]"],
            				                 ["Drive","Ride"],
            				                 ["Gossip","Haggle"],
            				                 ["Perception","Search"],
            				                 ["Speak Language \[Tilean\]","Swim"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Disarm","Quick Draw"],
            				                  ["Rapid Reload","Strike Mighty Blow"],
            				                  ["Sharpshooter","Strike to Stun"]
            				                  ]
  					},
  					"skills": ["Dodge Blow","Follow Trail","Secret Language \[Battle Tongue\]"],
  					"talents": [],
  					"trappings": ["Crossbow with 10 Bolts","Shield","Mail Shirt","Leather Jack","Healing Draught"]
                },
                {
             	   	"label":"Messenger",		//27
            			"mainAdvancements": ["WS","BS","T","Ag","Int","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Common Knowledge \[The Empire\]","Common Knowledge \[The Wasteland\]","Gossip"]
            				                 ],
            				"hasTalentChoice": false,
            				"talentChoices": []
  					},
  					"skills": ["Animal Care","Navigation","Outdoor Survival","Secret Signs \[Scout\[","Perception","Ride","Speak Language \[Reikspiel\]","Swim"],
  					"talents": [],
  					"trappings": ["Leather Jack","Map Case","Riding Horse with Saddle and Harness","Shield"]
                },
                {
             	   	"label":"Militiaman",		//28
            			"mainAdvancements": ["WS","BS","S","T","Ag"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Drive","Swim"],
            				                 ["Gossip","Gamble"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Specialist Weapon Group \[Two Handed\]","Rapid Reload"]
            				                  ]
  					},
  					"skills": ["Animal Care","Dodge Blow","Outdoor Survival","Perception","Search","Trade \[Any one\]"],
  					"talents": [],
  					"trappings": ["Bow with 10 Arrows or Halberd","Leather Jack","Leather Skullcap","Uniform"]
                },
                {
             	   	"label":"Miner",		//29
            			"mainAdvancements": ["WS","BS","S","T","Int","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Drive","Concealment"],
            				                 ["Evaluate","Outdoor Survival"],
            				                 ["Trade \[Miner\]","Trade \[Prospector\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Very Resilient","Warrior Born"]
            				                  ]
  					},
  					"skills": ["Animal Care","Navigation","Perception","Scale Sheer Surface"],
  					"talents": ["Orientation","Specialist Weapon Group \[Two-handed\]"],
  					"trappings": ["Two-Handed Pick","Leather Jack","Pick","Spade","Storm Lantern","Lamp Oil"]
                },
                {
             	   	"label":"Noble",		//30
            			"mainAdvancements": ["WS","BS","Ag","Int","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Blather","Command"],
            				                 ["Consume Alcohol","Performer"],
            				                 ["Gamble","Gossip"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Luck","Public Speaking"],
            				                  ["Savvy","Specialist Weapon Group \[Fencing\]"],
            				                  ["Schemer","Specialist Weapon Group \[Parrying\]"]
            				                  ]
  					},
  					"skills": ["Common Knowledge \[The Empire\]","Read\/Write","Ride","Speak Language \[Reikspiel\]"],
  					"talents": ["Etiquette"],
  					"trappings": ["Foil","Main Gauche","Noble's Garb","Riding Horse with Saddle and Harness","1d10 gold coins","Jewelry worth 6d10 gold coins"]
                },
                {
             	   	"label":"Norse Berserker",		//31
            			"mainAdvancements": ["WS","S","T","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": false,
            				"skillChoices": [],
            				"hasTalentChoice": false,
            				"talentChoices": []
  					},
  					"skills": ["Common Knowledge \[Norsca\]","Consume Alcohol","Intimidate","Performer \[Storyteller\]","Speak Language \[Norse\]","Swim"],
  					"talents": ["Frenzy","Quick Draw","Specialist Weapon Group \[Two Handed\]"],
  					"trappings": ["Leather Jerkin","Bottle of Spirits","Great Weapon or Shield"]
                },
                {
             	   	"label":"Outlaw",		//32
            			"mainAdvancements": ["WS","BS","Ag","Int"],
            			"secondaryAdvancements": ["A","W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Animal Care","Common Knowledge \[The Empire\]"],
            				                 ["Drive","Ride"],
            				                 ["Gossip","Secret Signs \[Thief\]"],
            				                 ["Set Trap","Swim"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Rover","Streetwise"],
            				                  ["Sharpshooter","Strike to Stun"]
            				                  ]
  					},
  					"skills": ["Concealment","Dodge Blow","Perception","Scale Sheer Surface","Silent Move"],
  					"talents": [],
  					"trappings": ["Leather Jerkin","Bow with 10 Arrows","Shield"]
                },
                {
             	   	"label":"Outrider",		//33
            			"mainAdvancements": ["WS","BS","Ag","Int","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": false,
            				"skillChoices": [],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Coolheaded","Very Strong"]
            				                  ]
  					},
  					"skills": ["Animal Care","Follow Trail","Navigation","Outdoor Survival","Perception","Ride","Search","Silent Move"],
  					"talents": ["Orientation","Specialist Weapon Group \[Entangling\]"],
  					"trappings": ["Bow or Crossbow with 10 Arrows or 10 Bolts","Net","Whip or Lasso","Leather Jack","Shield","10 Yards of Rope","Riding Horse with Saddle and Harness"]
                },
                {
             	   	"label":"Peasant",		//34
            			"mainAdvancements": ["WS","BS","S","T","Ag","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Animal Care","Charm"],
            				                 ["Animal Training","Swim"],
            				                 ["Charm Animal","Trade \[Cook\]"],
            				                 ["Gamble","Performer \[Dancer\]","Performer \[Singer\]"],
            				                 ["Outdoor Survival","Trade \[Farmer\]"],
            				                 ["Row","Set Trap"],
            				                 ["Scake Sheer Surface","Silent Move"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Hardy","Rover"],
            				                  ["Flee","Speacialist Weapon \[Sling\]"]
            				                  ]
  					},
  					"skills": [],
  					"talents": [],
  					"trappings": ["Sling or Quarterstaff","Leather Flask"]
                },
                {
             	   	"label":"Pit Fighter",		//35
            			"mainAdvancements": ["WS","T","Ag","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": false,
            				"skillChoices": [
            				                 
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Disarm","Wrestling"],
            				                  ["Quick Draw","Strike to Injure"],
            				                  ["Very Strong","Strong-Minded"]
            				                  ]
  					},
  					"skills": ["Dodge Blow","Intimidate"],
  					"talents": ["Specialist Weapon Group \[Flail\]","Specialist Weapon Group \[Parrying\]","Specialist Weapon Group \[Two-Handed\]","Strike Mighty Blow"],
  					"trappings": ["Flail or Great Weapon","Knuckle-Duster","Shield or Buckler","Mail Shirt","Leather Jack"]
                },
                {
             	   	"label":"Protagonist",		//36
            			"mainAdvancements": ["WS","S","Ag","WP"],
            			"secondaryAdvancements": ["A","W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Gossip","Haggle"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Disarm","Quick Draw"],
            				                  ["Menacing","Suave"]
            				                  ]
  					},
  					"skills": ["Dodge Blow","Intimidate","Ride"],
  					"talents": ["Street Fighting","Strike Mighty Blow","Strike to Injure","Strike to Stun"],
  					"trappings": ["Shield","Riding Horse with Saddle and Harness","Mail Shirt","Leather Jack"]
                },
                {
             	   	"label":"Rat Catcher",		//37
            			"mainAdvancements": ["WS","BS","T","Ag","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": false,
            				"skillChoices": [],
            				"hasTalentChoice": false,
            				"talentChoices": []
  					},
  					"skills": ["Animal Care","Animal Trainer","Concealment","Perception","Search","Set Trap","Silent Move"],
  					"talents": ["Resistance to Disease","Resistance to Poison","Specialist Weapon Group \[Sling\]","Tunnel Rat"],
  					"trappings": ["Sling with Ammunition","4 Animal Traps","Pole with 1d10 dead rats","Small but vicious dog"]
                },
                {
             	   	"label":"Roadwarden",		//38
            			"mainAdvancements": ["WS","BS","S","Ag","Int","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Gossip","Common Knowledge \[The Empire\]"],
            				                 ["Follow Trail","Secret Signs \[Scout\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Rapid Reload","Quick Draw"]
            				                  ]
  					},
  					"skills": ["Animal Care","Drive","Navigation","Outdoor Survival","Perception","Ride","Search"],
  					"talents": ["Specialist Weapon Group \[Gunpowder\]"],
  					"trappings": ["Pistol with 10 Firearm Balls and Gunpowder","Light Warhorse with Saddle and Harness","Shield","10 yards of Rope","Mail Shirt","Leather Jack"]
                },
                {
             	   	"label":"Rogue",		//39
            			"mainAdvancements": ["WS","BS","Ag","Int","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Gossip","Haggle"],
            				                 ["Gamble","Secret Signs \[Thief\]"],
            				                 ["Performer \[Actor\]","Performer \[Storyteller\]"],
            				                 ["Search","Secret Language \[Thieves' Tongue\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Flee\!","Streetwise"],
            				                  ["Luck","Sixth Sense"]
            				                  ]
  					},
  					"skills": ["Blather","Charm","Evaluate","Perception","Speak Language \[Reikspiel\]"],
  					"talents": ["Public Speaking"],
  					"trappings": ["Best Craftmenship Clothing","Dice or Deck of Cards","1d10 gc"]
                },
                {
             	   	"label":"Runebearer",		//40
            			"mainAdvancements": ["WS","BS","S","Ag","Int","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": false,
            				"skillChoices": [],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Fleet Footed","Sixth Sense"],
            				                  ["Very Resilient","Very Strong"]
            				                  ]
  					},
  					"skills": ["Dodge Blow","Navigation","Outdoor Survival","Secret Signs \[Scout\]","Perception","Swim"],
  					"talents": ["Flee\!","Orientation","Rapid Reload",""],
  					"trappings": ["Crossbow and 10 Bolts","Leather Jerkin","Healing Draught","Lucky Charm"]
                },
                {
             	   	"label":"Scribe",		//41
            			"mainAdvancements": ["Ag","Int","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Gossip","Common Knowledge \[The Empire\]"],
            				                 ["Speak Language \[Tilean\]","Speak Language \[Reikspiel\]"]
            				                 ],
            				"hasTalentChoice": false,
            				"talentChoices": []
  					},
  					"skills": ["Academic Knowledge \[Any one\]","Perception","Read\/Write","Secret Language \[Guild Tongue\]","Speak Language \[Breton\]","Speak Language \[Classical\]","Trade \[Calligrapher\]"],
  					"talents": ["Linguistics"],
  					"trappings": ["Knife","A Pair of Candles","Wax","5 matches","Illuminated Book","Writing Kit"]
                },
                {
             	   	"label":"Seaman",		//42
            			"mainAdvancements": ["WS","BS","S","Ag"],
            			"secondaryAdvancements": ["A","W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Common Knowledge \[Bretonnia\]","Common Knowledge \[Norsca\]","Common Knowledge \[Tilea\]","Common Knowledge \[The Wasteland\]"],
            				                 ["Consume Alcohol","Perception"],
            				                 ["Speak Language \[Breton\]","Speak Language \[Norse\]","Speak Language \[Tilean\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Hardy","Street Fighting"],
            				                  ["Strike Mighty Blow","Swashbuckler"]
            				                  ]
  					},
  					"skills": ["Dodge Blow","Row","Sail","Scale Sheer Surface","Swim"],
  					"talents": ["Seasoned Traveler"],
  					"trappings": ["Leather Jerkin","Bottle of Poor Craftmenship spirits"]
                },
                {
             	   	"label":"Servant",		//43
            			"mainAdvancements": ["WS","S","Ag","Int","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Animal Care","Trade \[Cook\]"],
            				                 ["Drive","Search"],
            				                 ["Evaluate","Haggle"],
            				                 ["Read\/Write","Sleight of Hand"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Flee\!","Acute Hearing"],
            				                  ["Etiquette","Hardy"],
            				                  ["Lightning Reflexes","Very Resilient"]
            				                  ]
  					},
  					"skills": ["Blather","Dodge Blow","Gossip","Perception"],
  					"talents": [],
  					"trappings": ["Good Craftmenship Clothing","Pewter Tankard","Tinderbox","Storm Lantern","Lamp Oil"]
                },
                {
             	   	"label":"Shieldbreaker",		//44
            			"mainAdvancements": ["WS","S","T","Ag","WP"],
            			"secondaryAdvancements": ["A","W"],
            			"choices": {
            				"hasSkillChoice": false,
            				"skillChoices": [],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Cool Headed","Acute Hearing"]
            				                  ]
  					},
  					"skills": ["Dodge Blow","Navigation","Perception","Scale Sheer Surface","Shadowing"],
  					"talents": ["Orientation","Strike Mighty Blow","Strike to Injure","Strike to Stun"],
  					"trappings": ["Crossbow with 10 Bolts","Mail Coat","Leather Jack","Leather Leggings","Shield","Grappling Hook","10 yards of Rope","Water Skin"]
                },
                {
             	   	"label":"Smuggler",		//45
            			"mainAdvancements": ["WS","BS","Ag","Int","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Gossip","Secret Language \[Thieves' Tongue\]"],
            				                 ["Speak Language \[Breton\]","Speak Language \[Kislevian\]","Secret Signs \[Thieves\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Dealmaker","Streetwise"]
            				                  ]
  					},
  					"skills": ["Drive","Evaluate","Haggle","Perception","Row","Search","Silent Move","Swim"],
  					"talents": [],
  					"trappings": ["Leather Jack","2 Torches","Draft Horse and Cart or Rowing Boat"]
                },
                {
             	   	"label":"Soldier",		//46
            			"mainAdvancements": ["WS","BS","Ag","WP"],
            			"secondaryAdvancements": ["A","W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Animal Care","Heal"],
            				                 ["Common Knowledge \[The Empire\]","Perception"],
            				                 ["Drive","Ride"],
            				                 ["Gamble","Gossip"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Disarm","Quick Draw"],
            				                  ["Sharpshooter","Strike Mighty Blow"],
            				                  ["Strike to Injure","Rapid Reload"],
            				                  ["Strike to Stun","Mighty Shot"],
            				                  ["Specialist Weapon Group \[Gunpowder\]","Specialist Weapon Group \[Two-Handed\]"]
            				                  ]
  					},
  					"skills": ["Dodge Blow","Intimidate"],
  					"talents": [],
  					"trappings": ["Halberd or Firearm with ammunition for 10 shots","Shield","Full Leather Armour","Uniform"]
                },
                {
             	   	"label":"Squire",		//47
            			"mainAdvancements": ["WS","BS","S","T","Ag","Fel"],
            			"secondaryAdvancements": ["A","W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Academic Knowledge \[Genealogy\]","Academic Knowledge \[Heraldry\]","Common Knowledge \[Bretonnia\]"],
            				                 ["Charm","Gossip"],
            				                 ["Speak Language \[Breton\]","Speak Language \[Reikspiel\]"]
            				                 ],
            				"hasTalentChoice": false,
            				"talentChoices": []
  					},
  					"skills": ["Animal Care","Animal Training","Dodge Blow","Ride"],
  					"talents": ["Etiquette","Specialist Weapon Group Group \[Cavalry\]","Strike Mighty Blow"],
  					"trappings": ["Demilance","Mail Shirt","Mail Coif","Leather Jack","Shield","Horse with Saddle and Harness"]
                },
                {
             	   	"label":"Squire",		//48
            			"mainAdvancements": ["Ag","Int","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Academic Knowledge \[Any one\]","Gossip"],
            				                 ["Charm","Consume Alcohol"],
            				                 ["Heal","Search"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Etiquette","Linguistics"],
            				                  ["Savvy","Suave"],
            				                  ["Seasoned Traveller","Super Numerate"]
            				                  ]
  					},
  					"skills": ["Academic Knowledge \[Any other one\]","Perception","Read\/Write","Speak Language \[Classical\]","Speak Language \[Reikspiel\]"],
  					"talents": [],
  					"trappings": ["Two Textbooks corresponding to Knowledge Skills","Writing Kit"]
                },
                {
             	   	"label":"Squire",		//49
            			"mainAdvancements": ["WS","BS","Ag","Int","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Charm","Scale Sheer Surface"],
            				                 ["Evaluate","Disguise"],
            				                 ["Gamble","Pick Lock"],
            				                 ["Read\/Write","Sleight of Hand"],
            				                 ["Secret Language \[Thieves' Tongue\]","Secret Signs \[Thief\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Alley Cat","Streetwise"],
            				                  ["Super Numerate","Trapfinder"]
            				                  ]
  					},
  					"skills": ["Concealment","Perception","Perception","Search","Silent Move"],
  					"talents": [],
  					"trappings": ["Leather Jerkin","Sack","Lock Picks","10 Yards of Rope"]
                },
                {
             	   	"label":"Thug",		//50
            			"mainAdvancements": ["WS","S","T","WP","Fel"],
            			"secondaryAdvancements": ["A","W"],
            			"choices": {
            				"hasSkillChoice": false,
            				"skillChoices": [],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Coolheaded","Lightning Reflexes"],
            				                  ["Resistance to Poison","Quick Draw"],
            				                  ["Strike to Injure","Wrestling"]
            				                  ]
  					},
  					"skills": ["Consume Alcohol","Dodge Blow","Gamble","Intimidate","Secret Language \[Thieves' Tongue\]"],
  					"talents": ["Disarm","Strike to Stun"],
  					"trappings": ["Knucle-Dusters","Mail Shirt","Leather Jerkin"]
                },
                {
             	   	"label":"Toll Keeper",		//51
            			"mainAdvancements": ["WS","BS","S","T","Ag","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Gossip","Haggle"],
            				                 ["Speak Language \[Breton\]","Speak Language \[Kislevian\]","Speak Language \[Tilean\]"],
            				                 ["Heal","Search"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Lightning Reflexes","Marksman"]
            				                  ]
  					},
  					"skills": ["Dodge Blow","Evaluate","Perception","Read\/Write","Search"],
  					"talents": [],
  					"trappings": ["Chest","Crossbow with 10 Bolts","Mail Shirt","Leather Jerkin","Shield","1d10 gc"]
                },
                {
             	   	"label":"Tomb Robber",		//52
            			"mainAdvancements": ["WS","Ag","Int","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Common Knowledge \[The Empire\]","Secret Signs \[Thief\]"],
            				                 ["Concealment","Outdoor Survival"],
            				                 ["Pick Lock","Silent Move"],
            				                 ["Speak Language \[Classical\]","Speak Language \[Khazalid\]","Speak Language \[Eltharin\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Luck","Sixth Sense"],
            				                  ["Trapfinder","Tunnel Rat"]
            				                  ]
  					},
  					"skills": ["Evaluate","Perception","Read\/Write","Scale Sheer Surface","Search"],
  					"talents": [],
  					"trappings": ["Leather Jack","Crowbar","Lantern","Lamp Oil","10 yards of Rope","2 Sacks"]
                },
                {
             	   	"label":"Tradesman",		//53
            			"mainAdvancements": ["S","T","Ag","Int","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Animal Care","Gossip"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Dealmaker","Savvy"]
            				                  ]
  					},
  					"skills": ["Drive","Haggle","Evaluate","Perception","Read\/Write","Secret Language \[Guild Tongue\]","Trade \[any two\]"],
  					"talents": [],
  					"trappings": ["Leather Jerkin","1d10 gc"]
                },
                {
             	   	"label":"Troll Slayer",		//54
            			"mainAdvancements": ["WS","S","T","Ag","WP"],
            			"secondaryAdvancements": ["A","W"],
            			"choices": {
            				"hasSkillChoice": false,
            				"skillChoices": [],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Disarm","Quick Draw"],
            				                  ["Lightning Reflexes","Very Resilient"]
            				                  ]
  					},
  					"skills": ["Consume Alcohol","Dodge Blow","Intimidate"],
  					"talents": ["Hardy","Specialist Weapon Group \[Two-Handed\]","Street Fighter","Strike Mighty Blow"],
  					"trappings": ["Great Weapon","Leather Jerkin","One Bottle of Poor Craftmenship Spirits"]
                },
                {
             	   	"label":"Vagabond",		//55
            			"mainAdvancements": ["WS","BS","Ag","Int","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Common Knowledge \[Bretonnia\]","Common Knowledge \[Estalia\]","Common Knowledge \[Kislev\]","Common Knowledge \[Tilea\]"],
            				                 ["Gossip","Secret Language \[Ranger Tongue\]","Secret Language \[Thieves' Tongue\]"],
            				                 ["Haggle","Swim"],
            				                 ["Heal","Perception"],
            				                 ["Performer \[Dancer\]","Performer \[Singer\]","Performer \[Storyteller\]","Secret Signs \[Ranger\]","Secret Signs \[Thief\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Fleet Footed","Rover"],
            				                  ["Marksman","Orientation"]
            				                  ]
  					},
  					"skills": ["Navigation","Outdoor Survival","Silent Move"],
  					"talents": ["Seasoned Traveler"],
  					"trappings": ["Back Pack","Rations for 1 Week","Tent","Water Skin"]
                },
                {
             	   	"label":"Valet",		//56
            			"mainAdvancements": ["Ag","Int","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Academic Knowledge \[Genealogy\]","Academic Knowledge \[Heraldry\]"]
            				                 ["Gossip","Speak Language \[Breton\]","Speak Language \[Reikspiel\]"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Coolheaded","Suave"],
            				                  ["Dealmaker","Seasoned Traveler"]
            				                  ]
  					},
  					"skills": ["Blather","Evaluate","Haggle","Percpetion","Read\/Write","Search"],
  					"talents": ["Etiquette"],
  					"trappings": ["Cologne","Purse","two sets of Best Craftmenship Clothing","Uniform"]
                },
                {
             	   	"label":"Watchman",		//57
            			"mainAdvancements": ["WS","BS","S","Ag","Int","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": false,
            				"skillChoices": [],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Coolheaded","Savvy"],
            				                  ["Disarm","Street Fighting"]
            				                  ]
  					},
  					"skills": ["Academic Knowledge \[Law\]","Dodge Blow","Follow Trail","Gossip","Intimidate","Perception","Search"],
  					"talents": ["Strike Mighty Blow","Strike to Stun"],
  					"trappings": ["Leather Jack","Lantern and Pole","Lamp Oil","Uniform"]
                },
                {
             	   	"label":"Woodsman",		//58
            			"mainAdvancements": ["WS","S","Ag","WP"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": true,
            				"skillChoices": [
            				                 ["Follow Trail","Set Trap"]
            				                 ],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Fleet Footed","Very Resilient"],
            				                  ["Dealmaker","Seasoned Traveler"]
            				                  ]
  					},
  					"skills": ["Concealment","Percpetion","Scale Sheer Surface","Secret Language \[Ranger Tongue\]","Secret Signs \[Ranger\]","Silent Move"],
  					"talents": ["Rover","Specialist Weapon Group \[Two-Handed\]"],
  					"trappings": ["Two-Handed Axe","Leather Jack","Antitoxin Kit"]
                },
                {
             	   	"label":"Zealot",		//59
            			"mainAdvancements": ["WS","S","T","WP","Fel"],
            			"secondaryAdvancements": ["W"],
            			"choices": {
            				"hasSkillChoice": false,
            				"skillChoices": [],
            				"hasTalentChoice": true,
            				"talentChoices": [
            				                  ["Coolheaded","Very Strong"],
            				                  ["Hardy","Suave"]
            				                  ]
  					},
  					"skills": ["Academic Knowledge \[Theology\]","Charm","Common Knowledge \[The Empire\]","Intimidate","Read\/Write"],
  					"talents": ["Public Speaking","Specialist Weapon Group \[Flail\]"],
  					"trappings": ["Flail or Morning Star","Leather Jack","Bottle of Good Craftmenship Spirits"]
                },
               ];

var character = {
		"firstName": "",
		"lastName": "",
		"race": "",
		"primaryAttributes":
		{
		"WS": "",
		"BS": "",
		"S": "",
		"T": "",
		"Ag": "",
		"Int": "",
		"WP": "",
		"Fel": ""
		},
		"shallyasMercy": "",
		"secondaryAttributes":
		{
		"A": "",
		"W": "",
		"SB": "",
		"TB": "",
		"M": "",
		"Mag": "",
		"IP": "",
		"FP": ""
		},
		"basicSkills":
		{
		"Animal Care":0,
		"Charm":0,
		"Command":0,
		"Concealment":0,
		"Consume Alcohol":0,
		"Disguise":0,
		"Drive":0,
		"Evaluate":0,
		"Gamble":0,
		"Gossip":0,
		"Haggle":0,
		"Intimidate":0,
		"Outdoor Survival":0,
		"Perception":0,
		"Ride":0,
		"Row":0,
		"Scale Sheer Surface":0,
		"Search":0,
		"Silent Move":0,
		"Swim":0
		
		},
		"advancedSkills":
		{
			
		},
		"talents":
		{
			
		},
		"freeAdvancement":"",
		"step0completed":false,
		"step1completed":false,
		"step2completed":false,
		"step3completed":false,
		"step4completed":false,
		"step5completed":false,
		"step6completed":false,
		"step7completed":false,
		};

//var characterString = "{\"character\":\"firstName\":\"\",\"lastName\":\"\",\"race\":\"\",\"primaryAttributes\":[\"WS\":\"\",\"BS\":\"\",\"S\":\"\",\"T\":\"\",\"Ag\":\"\",\"Int\":\"\",\"WP\":\"\",\"Fel\":\"\"],\"secondaryAttributes\":[\"A\":\"\",\"W\":\"\",\"SB\":\"\",\"TB\":\"\",\"M\":\"\",\"Mag\":\"\",\"IP\":\"\",\"FP\":\"\"],\"basicSkills\":[\"blabla\":\"level\",\"blabla\":\"level\"],\"advancedSkills\":[]}";
//var characterJSON = JSON.characterString.toJSON();


////////// CHARACTER SHEET VARIABLES //////////

var race;
var primaryAttributes = {WS:0,BS:0,S:0,T:0,Ag:0,Int:0,WP:0,Fel:0};
var secondaryAttributes = {A:0,W:0,SB:0,TB:0,M:0,Mag:0,IP:0,FP:0};
var fName;
var lName;

/////////  UTILITIES    ///////////

function resetCharacter() {
	character.firstName="";
	character.lastName="";
	character.race="";
	for (x in allPrimaryAttributes) character.primaryAttributes[x]="";
	character.shallyasMercy="";
	for (x in allSecondaryAttributes) character.secondaryAttributes[x]="";
	for (x in character.basicSkills) x=0;	// mah
	character.advancedSkills = {};
	character.talents = {};
	character.step0completed = false;
	character.step1completed = false;
	character.step2completed = false;
	character.step3completed = false;
	character.step4completed = false;
	character.step5completed = false;
	character.step6completed = false;
	character.step7completed = false;
	
	tempSkill = "";
	tempTalent = "";
	tempTalent1 = "";
	tempTalent2 = "";
	tempCareer = "";
	
	careerSkillChoices=[];
	careerTalentChoices=[];
	
	skillsGlobal = [];
	talentsGlobal = [];
	
	globalFreeRaise="";
}


function startsWith(test,prefix) {
	if(test.substring(0,prefix.length)==prefix) return true;
	else return false;
}

function endsWith(test,suffix) {
	if(test.substring(test.length-suffix.length,suffix.length)==suffix) return true;
	else return false;
}

function renderLabelForID (label) {
	var renderedLabel = label.toString().replace(/[\[\]&\/\\#,+()$~%.'":*?<>{}]/g, '');
	return renderedLabel.toString().replace(/\s+/g, '');
}
////////// STEP 0 //////////
function goToCharacterCreation() {
	resetCharacter();
	goToCCStep0();
}


function goToCCStep0() {
	$('#myContent').html('');
	$('#myContent').load('html/charCreation/cc_step0.html',function() {
		hideAllChecks("");
		$("#continueToStep1").hide();
		$('#backButton').show();
		$('#backButton').attr("onclick","goToMenu("+logged+")");
		//WL.App.overrideBackButton(goToMenu(logged));
		
		if(character.race!="") {
			$("#"+character.race+"Check").show();
			$("#continueToStep1").show();
		}
//		WL.SimpleDialog.show(
//				"My Title", "My Text", 
//				[{text: "First Button", handler: function() {WL.Logger.debug("First button pressed"); }
//				}]
//				);
	});
	
}

function choose(id) {
	hideAllChecks(id);
	var idToShow = "#"+id+"Check";
	character.race="";
	$(idToShow).show();
	if(character.step1completed) resetCharacter();
	character.race=id;
	$("#continueToStep1").show();
}

function hideAllChecks(except) {
	for (x in allRaces) {
		if(x!=except) {
			var idToShow="#"+x+"CheckOutline";
			var idToHide="#"+x+"Check";
			$(idToHide).hide();
			$(idToShow).show();
		}
		else $("#"+x+"CheckOutline").hide();
	}
}

function rollRace() {
	var roll = Math.floor(Math.random() * 4) + 1;
	switch (roll) {
	case 1:
		choose("Dwarf");
		break;
	case 2:
		choose("Elf");
		break;
	case 3:
		choose("Halfling");
		break;
	case 4:
		choose("Human");
		break;
	default:
		alert("roll ain't working right");
		break;
	}
}

function confirmRace() {
	character.step0completed=true;
	goToCCStep1();
}

////////// STEP 1 //////////

function goToCCStep1 () {
	
	$('#myContent').html('');
	$('#myContent').load('html/charCreation/cc_step1.html',function() {
		$('#race').html(character.race);
		hideAllPrimaryAttributes("");
		
		for (x in allPrimaryAttributes) $("#"+x).html (character.primaryAttributes[x]);
		if (!character.step1completed) {
			$("#continueToStep2").hide();
			$("#quickRoll").show();
		}
		else {
			$("#quickRoll").hide();
			for (x in allPrimaryAttributes) {
				$("#"+x).attr("style","color:#ef473a;font-weight:bold");
				$("#"+x+"Roll").hide();
				$("#"+x+"TimesDiv").hide();
				$("#"+x+"BestRollDiv").hide();
			}
		}
		$("#reset").attr("onclick","resetAllAttributes()");
		$('#backButton').show();
		$('#backButton').attr("onclick","goToCCStep0()");
		//WL.App.overrideBackButton(goToCCStep0());
	});
	
}

function resetAllAttributes () {
	for (x in allPrimaryAttributes) character.primaryAttributes[x]="";
	character.shallyasMercy="";
	character.step1completed=false;
	goToCCStep1();
}

function hideAllPrimaryAttributes (except) {
	for (x in allPrimaryAttributes) {
		if(x!=except) {
			var idToHide1="#"+x+"TimesDiv";
			var idToHide2="#"+x+"BestRollDiv";
			$(idToHide1).hide();
			$(idToHide2).hide();
		}
	}
}

function quickRollAll () {
	for (x in allPrimaryAttributes) rollAttribute(x+"Roll");
	//$("#quickRoll").hide();
	$("#keepAll").show();
	hideAllPrimaryAttributes("");
}

function keepQuickRoll () {
	for (x in allPrimaryAttributes) keepRoll(x+"Roll");
	$("#keepAll").hide();
	$("#quickRoll").hide();
}

function keepRoll (id) {
	id="#"+id.substring(0,id.length-4);
	var idBestRoll=id+"BestRoll";
	var numBestRoll = $(idBestRoll).html();
	$(id).html(numBestRoll);
	$(id).attr("style","color:#ef473a;font-weight:bold");
	$(id+"Roll").hide();
	$(id+"TimesDiv").hide();
	$(id+"BestRollDiv").hide();
	
	var isPrimary = false;
	for (x in allPrimaryAttributes) if (id=="#"+x) isPrimary=true;
	
	var isAllDone=false;
	
	if (isPrimary) {
		character.primaryAttributes[id.substring(1,id.length)]=$(id).html;
	for(x in allPrimaryAttributes) {
		if($("#"+x+"Roll").is(":hidden")) isAllDone = true;
		else {
			isAllDone = false;
			break;
		}
	}
	}
	else {
		character.secondaryAttributes[id.substring(1,id.length)]=$(id).html();
		if($("#WRoll").is(":hidden") && $("#FPRoll").is(":hidden")) isAllDone = true;
	}
	if (isAllDone) {
		if (isPrimary) {
			$("#continueToStep2").show();
		}
		else {
			$("#continueToStep4").show();
			//console.log(character);
		}
	}
}

function rollAttribute (id) {
	var race = $("#race").html();
	id="#"+id.substring(0,id.length-4);
	$(id).html('');
	var roll1 = Math.floor(Math.random() * 10) + 1;
	var roll2 = Math.floor(Math.random() * 10) + 1;
	var result=0;
	switch (race) {
	case "Dwarf":
		switch (id) {
		case "#WS":
			result=roll1+roll2+30;
			break;
		case "#BS":
			result=roll1+roll2+20;
			break;
		case "#S":
			result=roll1+roll2+20;
			break;
		case "#T":
			result=roll1+roll2+30;
			break;
		case "#Ag":
			result=roll1+roll2+10;
			break;
		case "#Int":
			result=roll1+roll2+20;
			break;
		case "#WP":
			result=roll1+roll2+20;
			break;
		case "#Fel":
			result=roll1+roll2+10;
			break;

		default:
			break;
		}
		break;
	case "Elf":
		switch (id) {
		case "#WS":
			result=roll1+roll2+20;
			break;
		case "#BS":
			result=roll1+roll2+30;
			break;
		case "#S":
			result=roll1+roll2+20;
			break;
		case "#T":
			result=roll1+roll2+20;
			break;
		case "#Ag":
			result=roll1+roll2+30;
			break;
		case "#Int":
			result=roll1+roll2+20;
			break;
		case "#WP":
			result=roll1+roll2+20;
			break;
		case "#Fel":
			result=roll1+roll2+20;
			break;

		default:
			break;
		}
		break;
	case "Halfling":
		switch (id) {
		case "#WS":
			result=roll1+roll2+10;
			break;
		case "#BS":
			result=roll1+roll2+30;
			break;
		case "#S":
			result=roll1+roll2+10;
			break;
		case "#T":
			result=roll1+roll2+10;
			break;
		case "#Ag":
			result=roll1+roll2+30;
			break;
		case "#Int":
			result=roll1+roll2+20;
			break;
		case "#WP":
			result=roll1+roll2+20;
			break;
		case "#Fel":
			result=roll1+roll2+30;
			break;

		default:
			break;
		}
		break;
	case "Human":
		result=roll1+roll2+20;
		break;
	default:
		break;
	}
	$(id).html(result);
	character.primaryAttributes[id.substring(1, id.length)]="";
	showSubDivs(id);
	hideAllPrimaryAttributes(id.substring(1,id.length));
	
	var nRolled = $(id+"Times").html();
	nRolled++;
	$(id+"Times").html(nRolled);
	
	var bestRoll = $(id+"BestRoll").html();
	bestRoll=maxRoll(bestRoll,result);
	$(id+"BestRoll").html(bestRoll);
	
	$(id+"Span").attr("onclick","toggleSubDivs(\""+id+"\")");
}

function showSubDivs(id) {
	var idToShow1 = id+"TimesDiv";
	var idToShow2 = id+"BestRollDiv";
	$(idToShow1).show();
	$(idToShow2).show();
}

function toggleSubDivs(id) {		// IT SUCKS ATM - ONLY TESTING ON WS
	var idToShow1 = id+"TimesDiv";
	var idToShow2 = id+"BestRollDiv";
	if ($(idToShow1).is(":visible")) $(idToShow1).hide();
	else $(idToShow1).show();
	if ($(idToShow2).is(":visible"))$(idToShow2).hide();
	else $(idToShow2).show();
}

function maxRoll(cMax,newRoll) {
	if(cMax>newRoll || cMax==newRoll) return cMax;
	else return newRoll;
}

function confirmPrimaryAttributes() {
	character.step1completed=true;
	for (x in allPrimaryAttributes) {
		character.primaryAttributes[x] = $("#"+x).html();
	}
	goToCCStep2();
}

////////// STEP 2 //////////

function goToCCStep2 () {

	$('#myContent').html('');
	$('#myContent').load('html/charCreation/cc_step2.html',function() {
		var notAppliable = true;
		for (x in allPrimaryAttributes) {
			$("#"+x).html(character.primaryAttributes[x]);
			if (character.primaryAttributes[x] >= raceAvgRoll(character.race,x)) $("#"+x+"Plus").hide();
			else notAppliable = false;
		}
		if (notAppliable) {
			character.step2completed=true;
			goToCCStep3();
			highPrimaryAttributes = true;
		}
		else {
			if(!character.step2completed)$("#continueToStep3").hide();
			else toggleRaiseToAvg(character.shallyasMercy+"Plus");
			$('#backButton').show();
			$('#backButton').attr("onclick","goToCCStep1()");
			//WL.App.overrideBackButton(goToCCStep1());
		}
	});
	
}

function toggleRaiseToAvg (id) {
	
	id=id.substring(0,id.length-3);	//removing the "Div" subfix
	$("#"+id+"Plus").attr("style","color: #ffc900");
	$("#"+id).attr("onclick","");
	$("#"+id).html(raceAvgRoll(character.race,id));
	character.shallyasMercy=id;
	
	for (x in allPrimaryAttributes) {
		if ($("#"+x+"Plus").is(":visible") && x!=id) {
			$("#"+x+"Plus").attr("style","color:rgb(222,222,217)");
			$("#"+x+"Div").attr("onclick","toggleRaiseToAvg(this.id)");
			$("#"+x).html(character.primaryAttributes[x]);
		}
	}
	
	$("#continueToStep3").show();
}

function raceAvgRoll (thisRace,thisAttribute) {
	switch (thisRace) {
	case "Dwarf":
		switch (thisAttribute) {
		case "WS":
			return 41;
		case "BS":
			return 31;
		case "S":
			return 31;
		case "T":
			return 41;
		case "Ag":
			return 21;
		case "Int":
			return 31;
		case "WP":
			return 31;
		case "Fel":
			return 21;
		default:
			return -1;
		}
	case "Elf":
		switch (thisAttribute) {
		case "WS":
			return 31;
		case "BS":
			return 41;
		case "S":
			return 31;
		case "T":
			return 31;
		case "Ag":
			return 41;
		case "Int":
			return 31;
		case "WP":
			return 31;
		case "Fel":
			return 31;
		default:
			return -1;
		}
	case "Halfling":
		switch (thisAttribute) {
		case "WS":
			return 21;
		case "BS":
			return 41;
		case "S":
			return 21;
		case "T":
			return 21;
		case "Ag":
			return 41;
		case "Int":
			return 31;
		case "WP":
			return 31;
		case "Fel":
			return 41;
		default:
			return -1;
		}
	case "Human":
		return 31;
	default:
		return -2;
	}
}


function confirmUpgradedAttributes () {
	character.step2completed=true;
	goToCCStep3();
}
////////// STEP 3 //////////

function goToCCStep3 () {

	$('#myContent').html('');
	$('#myContent').load('html/charCreation/cc_step3.html',function() {
		// write race into race label
		$("#race").html(character.race);
		// assign fixed values
		$("#A").html("1");
		character.secondaryAttributes.A=1;
		var SB = 0;
		if (character.shallyasMercy=="S") SB=Math.floor(raceAvgRoll(character.race,"S")/10);
		else SB=Math.floor(character.primaryAttributes.S/10);
		$("#SB").html(SB);
		character.secondaryAttributes.SB=SB;
		var TB = 0;
		if (character.shallyasMercy=="T") TB=Math.floor(raceAvgRoll(character.race,"T")/10);
		else TB=Math.floor(character.primaryAttributes.T/10);
		$("#TB").html(TB);
		character.secondaryAttributes.TB=TB;
		var M = calculateMovement(character.race);
		$("#M").html(M);
		character.secondaryAttributes.M=M;
		$("#Mag").html("0");
		character.secondaryAttributes.Mag=0;
		$("#IP").html("0");
		character.secondaryAttributes.IP=0;
		
		// assign already rolled values if any
		// assign onclick values to Roll buttons
		// hide roll subdivs
		var rollable = {W:"W",FP:"FP"};
		for (x in rollable) {
			$("#"+x).html(character.secondaryAttributes[x]);
			var idRoll = "#"+x+"Roll";
			var idToHide1="#"+x+"TimesDiv";
			var idToHide2="#"+x+"BestRollDiv";
			$(idRoll).attr("onclick","roll"+x+"(\""+character.race+"\")");
			$(idToHide1).hide();
			$(idToHide2).hide();
			if (character.step3completed) {
				$(idRoll).hide();
				$("#"+x).attr("class","span-result-s-done");
				$("#continueToStep4").show();
			}
			$("#"+x).show();
		}
		
		// hide continue button
		if(!character.step3completed) $("#continueToStep4").hide();
		
		$('#backButton').show();
		if (highPrimaryAttributes) $('#backButton').attr("onclick","goToCCStep1()");
		else $('#backButton').attr("onclick","goToCCStep2()");
		//WL.App.overrideBackButton(goToCCStep2());
	});
	
}

function calculateMovement(thisRace) {
	switch (thisRace) {
	case "Dwarf":
		return 3;
	case "Elf":
		return 5;
	case "Halfling":
		return 4;
	case "Human":
		return 4;
	default:
		return -1;
	}
}

function rollW() {
	var thisRace=character.race;
	var roll = Math.floor(Math.random() * 10) + 1;
	var result = 0;
	switch (thisRace) {
	case "Dwarf":
		if (roll<4) result = 11;
		if (roll<7 && roll>3) result = 12;
		if (roll<10 && roll>6) result = 13;
		if (roll == 10) result = 14;
		break;
	case "Elf":
		if (roll<4) result = 9;
		if (roll<7 && roll>3) result = 10;
		if (roll<10 && roll>6) result = 11;
		if (roll == 10) result = 12;
		break;
	case "Halfling":
		if (roll<4) result = 8;
		if (roll<7 && roll>3) result = 9;
		if (roll<10 && roll>6) result = 10;
		if (roll == 10) result = 11;
		break;
	case "Human":
		if (roll<4) result = 10;
		if (roll<7 && roll>3) result = 11;
		if (roll<10 && roll>6) result = 12;
		if (roll == 10) result = 13;
		break;
	default:
		break;
	}
	//update values
	$("#W").html(result);
	var nRolled = $("#WTimes").html();
	nRolled++;
	$("#WTimes").html(nRolled);
	var bestRoll = $("#WBestRoll").html();
	bestRoll=maxRoll(bestRoll,result);
	$("#WBestRoll").html(bestRoll);
	$("#WTimesDiv").show();
	$("#WBestRollDiv").show();
	// hide other subdivs
	$("#FPTimesDiv").hide();
	$("#FPBestRollDiv").hide();
}

function rollFP() {
	var thisRace = character.race;
	var roll = Math.floor(Math.random() * 10) + 1;
	var result = 0;
	switch (thisRace) {
	case "Dwarf":
		if (roll<5) result = 1;
		if (roll<8 && roll>4) result = 2;
		if (roll>7) result = 3;
		break;
	case "Elf":
		if (roll<5) result = 1;
		if (roll<8 && roll>4) result = 2;
		if (roll>7) result = 2;
		break;
	case "Halfling":
		if (roll<5) result = 2;
		if (roll<8 && roll>4) result = 2;
		if (roll>7) result = 3;
		break;
	case "Human":
		if (roll<5) result = 2;
		if (roll<8 && roll>4) result = 3;
		if (roll>7) result = 3;
		break;
	default:
		break;
	}
	//update values
	$("#FP").html(result);
	var nRolled = $("#FPTimes").html();
	nRolled++;
	$("#FPTimes").html(nRolled);
	var bestRoll = $("#FPBestRoll").html();
	bestRoll=maxRoll(bestRoll,result);
	$("#FPBestRoll").html(bestRoll);
	$("#FPTimesDiv").show();
	$("#FPBestRollDiv").show();
	// hide other subdivs
	$("#WTimesDiv").hide();
	$("#WBestRollDiv").hide();
}


function confirmSecondaryAttributes() {
	//for (x in allSecondaryAttributes) character.secondaryAttributes[x]=$("#"+x);
	character.step3completed=true;
	goToCCStep4();
}
////////// STEP 4 //////////

function goToCCStep4 () {

	$('#myContent').html('');
	$('#myContent').load('html/charCreation/cc_step4.html',function() {
		// write race into race label
		$("#race").html(character.race);
		if (!character.step4completed) {
			$("#resetAllChoices").hide();
			$("#continueToStep5").hide();
			renderStep4(false);
		}
		else {
			renderStep4(true);
			$("#continueToStep5").show();
			if(character.race=="Halfling" || character.race=="Human")$("#resetAllChoices").show();
		}
		$('#backButton').show();
		$('#backButton').attr("onclick","goToCCStep3()");
		//WL.App.overrideBackButton(goToCCStep2());
	});
	
}

function resetChoices() {
	tempSkill="";
	tempSkill1="";
	tempSkill2="";
	tempTalent="";
	tempTalent1="";
	tempTalent2="";
	character.step4completed=false;
	goToCCStep4();
}

function renderStep4(isCompleted) {
	var racialFeaturesSkills = "";
	var racialFeaturesTalents = "";
	
	switch (character.race) {
	case "Dwarf":
		//// SKILLS ////
		racialFeaturesSkills+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Common Knowledge [Dwarfs]";
		racialFeaturesSkills+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesSkills+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Speak Language [Khalazid]";
		racialFeaturesSkills+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesSkills+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Speak Language [Reikspiel]";
		racialFeaturesSkills+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesSkills+="<a href=\"#\" class=\"item\">Pick one of the following:</a>";
		racialFeaturesSkills+="<div class=\"list\" style=\"border-top-color: #ddd; border-top-width: 1px; border-top-style: solid	\">";
		var optSkillsArray = ["Stoneworker","Smith","Miner"];
		var optSkillsArrayLength = optSkillsArray.length;
		if(!isCompleted)tempSkill = "";
		for (i=0;i<optSkillsArrayLength;i++) {
			var skill = optSkillsArray[i];
			racialFeaturesSkills+="<a id=\""+skill+"\" class=\"item item-icon-right span-smalltext\" href=\"#\" style=\"font-weight: bold\"> Trade ["+skill+"]";
			racialFeaturesSkills+="<i id=\""+skill+"Check\" class=\"icon ion-ios-checkmark-empty\"></i></a>";
		}
		racialFeaturesSkills+="</div>";
		$("#skills").html(racialFeaturesSkills);
		for (i=0;i<optSkillsArrayLength;i++) {
			var skill = optSkillsArray[i];
			$("#"+skill).attr("onclick","selectDwarfSkill(\"Trade\",this.id,\"Int\")");
			$("#"+skill+"Check").hide();
		}
		if(isCompleted) {
			if(tempSkill=="Trade \[Stoneworker\] (Int)")selectDwarfSkill ("Trade","Stoneworker","Int");
			if(tempSkill=="Trade \[Miner\] (Int)")selectDwarfSkill ("Trade","Miner","Int");
			if(tempSkill=="Trade \[Smith\] (Int)")selectDwarfSkill ("Trade","Smith","Int");
		}
		character.advancedSkills["Common Knowledge \[Dwarfs\]"] = 0;
		character.advancedSkills["Speak Language \[Khalazid\]"] = 0;
		character.advancedSkills["Speak Language \[Reikspiel\]"] = 0;
		
		//// TALENTS ////
		racialFeaturesTalents+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Dwarfcraft";
		racialFeaturesTalents+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesTalents+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Grudge-born Fury";
		racialFeaturesTalents+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesTalents+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Night Vision";
		racialFeaturesTalents+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesTalents+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Resistance to Magic";
		racialFeaturesTalents+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesTalents+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Stout-hearted";
		racialFeaturesTalents+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesTalents+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Sturdy";
		racialFeaturesTalents+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		
		$("#talents").html(racialFeaturesTalents);
		
		character.talents["Dwarfcraft"] = "";
		character.talents["Grudge-born Fury"] = "";
		character.talents["Night Vision"] = "";
		character.talents["Resistance to Magic"] = "";
		character.talents["Stout-hearted"] = "";
		character.talents["Sturdy"] = "";
		break;

	case "Elf":
		//// SKILLS ////
		racialFeaturesSkills+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Common Knowledge [Elves]";
		racialFeaturesSkills+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesSkills+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Speak Language [Eltharin]";
		racialFeaturesSkills+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesSkills+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Speak Language [Reikspiel]";
		racialFeaturesSkills+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		
		$("#skills").html(racialFeaturesSkills);
		
		character.advancedSkills["Common Knowledge \[Elves\]"] = 0;
		character.advancedSkills["Speak Language \[Eltharin\]"] = 0;
		character.advancedSkills["Speak Language \[Reikspiel\]"] = 0;
		
		//// TALENTS ////
		racialFeaturesTalents+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Excellent Vision";
		racialFeaturesTalents+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesTalents+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Night Vision";
		racialFeaturesTalents+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		
		racialFeaturesTalents+="<a href=\"#\" class=\"item\">Pick one of the following:</a>";
		racialFeaturesTalents+="<div class=\"list\" style=\"border-top-color: #ddd; border-top-width: 1px; border-top-style: solid	\">";
		var optTalentsArray = ["AethyricAttunement","SpecialistWeapon"]; // Specialist Weapon Group \[Longbow\]
		var optTalentsArrayLength = optTalentsArray.length;
		if(!isCompleted) tempTalent1 = "";
		for (i=0;i<optTalentsArrayLength;i++) {
			var talent = optTalentsArray[i];
			racialFeaturesTalents+="<a id=\""+talent+"\" class=\"item item-icon-right span-smalltext\" href=\"#\" style=\"font-weight: bold\" onclick=\"selectElfTalent(this.id)\">";
			if (talent=="AethyricAttunement") racialFeaturesTalents+="Aethyric Attunement";
			else racialFeaturesTalents+="Specialist Weapon Group \[Longbow\]";
			racialFeaturesTalents+="<i id=\""+talent+"Check\" class=\"icon ion-ios-checkmark-empty\"></i></a>";
		}
		racialFeaturesTalents+="</div>";
		
		racialFeaturesTalents+="<a href=\"#\" class=\"item\" style=\"margin-top: -20px !important\">Pick one of the following:</a>";
		racialFeaturesTalents+="<div class=\"list\" style=\"border-top-color: #ddd; border-top-width: 1px; border-top-style: solid;\">";
		optTalentsArray = ["Coolheaded","Savvy"];
		optTalentsArrayLength = optTalentsArray.length;
		if(!isCompleted) tempTalent2 = "";
		for (i=0;i<optTalentsArrayLength;i++) {
			var talent = optTalentsArray[i];
			racialFeaturesTalents+="<a id=\""+talent+"\" class=\"item item-icon-right span-smalltext\" href=\"#\" style=\"font-weight: bold\" onclick=\"selectElfTalent(this.id)\">"+talent;
			racialFeaturesTalents+="<i id=\""+talent+"Check\" class=\"icon ion-ios-checkmark-empty\"></i></a>";
		}
		racialFeaturesTalents+="</div>";
		
		$("#talents").html(racialFeaturesTalents);
		optTalentsArray = ["AethyricAttunement","SpecialistWeapon","Coolheaded","Savvy"];
		optTalentsArrayLength = optTalentsArray.length;
		for (i=0;i<optTalentsArrayLength;i++) $("#"+optTalentsArray[i]+"Check").hide();
		
		if(isCompleted) {
			if(tempTalent1=="Aethyric Attunement") selectElfTalent("AethyricAttunement");
			else selectElfTalent("SpecialistWeapon");
			selectElfTalent(tempTalent2);
		}
		character.talents["Excellent Vision"] = "";
		character.talents["Night Vision"] = "";
		break;
		
	case "Halfling":
		//// SKILLS ////
		racialFeaturesSkills+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Common Knowledge [Halflings]";
		racialFeaturesSkills+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesSkills+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Speak Language [Halfling]";
		racialFeaturesSkills+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesSkills+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Speak Language [Reikspiel]";
		racialFeaturesSkills+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesSkills+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Gossip";
		racialFeaturesSkills+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesSkills+="<a href=\"#\" class=\"item\">Pick one of the following:</a>";
		racialFeaturesSkills+="<div class=\"list\" style=\"border-top-color: #ddd; border-top-width: 1px; border-top-style: solid	\">";
		var optSkillsArray = ["Genealogy","Heraldry"];
		var optSkillsArrayLength = optSkillsArray.length;
		if(!isCompleted) tempSkill1 = "";
		for (i=0;i<optSkillsArrayLength;i++) {
			var skill = optSkillsArray[i];
			racialFeaturesSkills+="<a id=\""+skill+"\" class=\"item item-icon-right span-smalltext\" href=\"#\" style=\"font-weight: bold\"> Knowledge ["+skill+"]";
			racialFeaturesSkills+="<i id=\""+skill+"Check\" class=\"icon ion-ios-checkmark-empty\"></i></a>";
		}
		racialFeaturesSkills+="</div>";
		racialFeaturesSkills+="<a href=\"#\" class=\"item\" style=\"margin-top: -20px !important\">Pick one of the following:</a>";
		racialFeaturesSkills+="<div class=\"list\" style=\"border-top-color: #ddd; border-top-width: 1px; border-top-style: solid	\">";
		optSkillsArray = ["Cook","Farmer"];
		optSkillsArrayLength = optSkillsArray.length;
		if(!isCompleted) tempSkill2 = "";
		for (i=0;i<optSkillsArrayLength;i++) {
			var skill = optSkillsArray[i];
			racialFeaturesSkills+="<a id=\""+skill+"\" class=\"item item-icon-right span-smalltext\" href=\"#\" style=\"font-weight: bold\"> Trade ["+skill+"]";
			racialFeaturesSkills+="<i id=\""+skill+"Check\" class=\"icon ion-ios-checkmark-empty\"></i></a>";
		}
		racialFeaturesSkills+="</div>";
		$("#skills").html(racialFeaturesSkills);
		optSkillsArray = ["Genealogy","Heraldry","Cook","Farmer"];
		optSkillsArrayLength = optSkillsArray.length;
		for (i=0;i<optSkillsArrayLength;i++) {
			var skill = optSkillsArray[i];
			if(skill=="Cook" || skill=="Farmer") $("#"+skill).attr("onclick","selectHalflingSkill(\"Trade\",this.id,\"Int\")");
			else $("#"+skill).attr("onclick","selectHalflingSkill(\"Knowledge\",this.id,\"Int\")");
			$("#"+skill+"Check").hide();
		}
		
		if(isCompleted) {
			if(tempSkill1=="Knowledge \[Genealogy\] (Int)") selectHalflingSkill("Knowledge", "Genealogy", "Int");
			else if(tempSkill1=="Knowledge \[Heraldry\] (Int)") selectHalflingSkill("Knowledge", "Heraldry", "Int");
			if(tempSkill2=="Trade \[Cook\] (Int)") selectHalflingSkill("Trade", "Cook", "Int");
			else if(tempSkill2=="Trade \[Farmer\] (Int)") selectHalflingSkill("Trade", "Farmer", "Int");
		}
		
		character.advancedSkills["Common Knowledge \[Halfling\]"] = 0;
		character.advancedSkills["Speak Language \[Halfling\]"] = 0;
		character.advancedSkills["Speak Language \[Reikspiel\]"] = 0;
		character.basicSkills["Gossip"] = 1;
		
		//// TALENTS ////
		racialFeaturesTalents+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Night Vision";
		racialFeaturesTalents+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesTalents+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Resistance to Chaos";
		racialFeaturesTalents+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesTalents+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Specialist Weapon Group \[Sling\]";
		racialFeaturesTalents+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		
		racialFeaturesTalents+="<a id=\"halfRollDiv\" href=\"#\" class=\"item\">Roll a random talent:";
		racialFeaturesTalents+="<button id=\"halfRoll\" class=\"button button-small button-assertive\" style=\"font-size: 13px !important;width: 50px !important;display:table-cell; position:absolute !important; top: 8px; bottom: 8px; right:10px !important\">Roll</button></a>";
		racialFeaturesTalents+="<a id=\"halfKeepDiv\" href=\"#\" class=\"item item-icon-right span-smalltext\" style=\"max-height:54px !important;min-height:54px !important;\"><span id=\"halfTalent\" style=\"color: grey;font-style: italic\">Random Talent</span>";
		racialFeaturesTalents+="<button id=\"halfKeep\" class=\"button button-small button-energized\" style=\"font-size: 13px !important;width: 50px !important;display:table-cell; position:absolute !important; top: 8px; bottom: 8px; right:10px !important\">Keep</button>";
		racialFeaturesTalents+="<i id=\"halfTalentCheck\" class=\"icon ion-ios-checkmark-empty\"></i></a>";
		$("#talents").html(racialFeaturesTalents);
		$("#halfRoll").attr("onclick","rollTalent(\"Halfling\",0)");
		$("#halfKeep").attr("onclick","keepTalent(0)");
		$("#halfTalentCheck").hide();
		$("#halfKeepDiv").hide();
		
		if(isCompleted) {
			$("#halfTalent").html(tempTalent);
			$("#halfTalent").attr("style","max-height:54px !important;min-height:54px !important; font-weight: bold !important;");
			$("#halfKeepDiv").show();
			keepTalent(0);
		}
		
		character.talents["Night Vision"] = "";
		character.talents["Resistance to Chaos"] = "";
		character.talents["Specialist Weapon Group"] = "";
		break;
		
	case "Human":
		//// SKILLS ////
		racialFeaturesSkills+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Common Knowledge [Empire]";
		racialFeaturesSkills+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesSkills+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Gossip";
		racialFeaturesSkills+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesSkills+="<a href=\"#\" class=\"item span-result-done item-icon-right span-smalltext\">Speak Language [Reikspiel]";
		racialFeaturesSkills+="<i class=\"icon ion-ios-checkmark-empty\"></i></a>";

		$("#skills").html(racialFeaturesSkills);
		
		character.advancedSkills["Common Knowledge \[Empire\]"] = 0;
		character.advancedSkills["Speak Language \[Reikspiel\]"] = 0;
		character.basicSkills["Gossip"] = 1;
		
		//// TALENTS ////
		racialFeaturesTalents+="<a id=\"humRollDiv1\" href=\"#\" class=\"item\">Roll a random talent:";
		racialFeaturesTalents+="<button id=\"humRoll1\" class=\"button button-small button-assertive\" style=\"font-size: 13px !important;width: 50px !important;display:table-cell; position:absolute !important; top: 8px; bottom: 8px; right:10px !important\">Roll</button></a>";
		racialFeaturesTalents+="<a id=\"humKeepDiv1\" href=\"#\" class=\"item item-icon-right span-smalltext\" style=\"max-height:54px !important;min-height:54px !important;\"><span id=\"humTalent1\" style=\"color: grey;font-style: italic\">Random Talent</span>";
		racialFeaturesTalents+="<button id=\"humKeep1\" class=\"button button-small button-energized\" style=\"font-size: 13px !important;width: 50px !important;display:table-cell; position:absolute !important; top: 8px; bottom: 8px; right:10px !important\">Keep</button>";
		racialFeaturesTalents+="<i id=\"humTalentCheck1\" class=\"icon ion-ios-checkmark-empty\"></i></a>";
		racialFeaturesTalents+="<a id=\"humRollDiv2\" href=\"#\" class=\"item\">Roll a random talent:";
		racialFeaturesTalents+="<button id=\"humRoll2\" class=\"button button-small button-assertive\" style=\"font-size: 13px !important;width: 50px !important;display:table-cell; position:absolute !important; top: 8px; bottom: 8px; right:10px !important\">Roll</button></a>";
		racialFeaturesTalents+="<a id=\"humKeepDiv2\" href=\"#\" class=\"item item-icon-right span-smalltext\" style=\"max-height:54px !important;min-height:54px !important;\"><span id=\"humTalent2\" style=\"color: grey;font-style: italic\">Random Talent</span>";
		racialFeaturesTalents+="<button id=\"humKeep2\" class=\"button button-small button-energized\" style=\"font-size: 13px !important;width: 50px !important;display:table-cell; position:absolute !important; top: 8px; bottom: 8px; right:10px !important\">Keep</button>";
		racialFeaturesTalents+="<i id=\"humTalentCheck2\" class=\"icon ion-ios-checkmark-empty\"></i></a>";
		
		$("#talents").html(racialFeaturesTalents);
		$("#humRoll1").attr("onclick","rollTalent(\"Human\",1)");
		$("#humKeep1").attr("onclick","keepTalent(1)");
		$("#humTalentCheck1").hide();
		$("#humKeepDiv1").hide();
		$("#humRoll2").attr("onclick","rollTalent(\"Human\",2)");
		$("#humKeep2").attr("onclick","keepTalent(2)");
		$("#humTalentCheck2").hide();
		$("#humKeepDiv2").hide();
		
		if(isCompleted) {
			$("#humTalent1").html(tempTalent1);
			$("#humTalent1").attr("style","max-height:54px !important;min-height:54px !important; font-weight: bold !important;");
			$("#humKeepDiv1").show();
			keepTalent(1);
			$("#humTalent2").html(tempTalent2);
			$("#humTalent2").attr("style","max-height:54px !important;min-height:54px !important; font-weight: bold !important;");
			$("#humKeepDiv2").show();
			keepTalent(2);
		}
		break;
		
	default:
		break;
	}	
}

function selectDwarfSkill (base,id,baseAttr) {
	
	var optSkillsArray = ["Stoneworker","Smith","Miner"];
	var optSkillsArrayLength = optSkillsArray.length;
	for (i=0;i<optSkillsArrayLength;i++) {
		if (optSkillsArray[i].localeCompare(id)!=0) {
			$("#"+optSkillsArray[i]).attr("class","item item-icon-right span-smalltext");
			$("#"+optSkillsArray[i]+"Check").hide();
		}
	}
	var newField = base+" \["+id+"\]";
	tempSkill = newField;
	$("#continueToStep5").show();
	$("#"+id+"Check").show();
	$("#"+id).attr("class",$("#"+id).attr("class")+" span-result-done");
}

function selectElfTalent (id) {
	
	if (id=="Coolheaded" || id=="Savvy") {
		var optTalentsArray = ["Coolheaded","Savvy"];
		var optTalentsArrayLength = optTalentsArray.length;
		for (i=0;i<optTalentsArrayLength;i++) {
			if (optTalentsArray[i].localeCompare(id)!=0) {
				$("#"+optTalentsArray[i]).attr("class","item item-icon-right span-smalltext");
				$("#"+optTalentsArray[i]+"Check").hide();			
			}
		}
		tempTalent2 = id;
	}
	else {
		var optTalentsArray = ["AethyricAttunement","SpecialistWeapon"];
		var optTalentsArrayLength = optTalentsArray.length;
		for (i=0;i<optTalentsArrayLength;i++) {
			if (optTalentsArray[i].localeCompare(id)!=0) {
				$("#"+optTalentsArray[i]).attr("class","item item-icon-right span-smalltext");
				$("#"+optTalentsArray[i]+"Check").hide();			
			}
		}
		if (id == "AethyricAttunement") tempTalent1 = "Aethyric Attunement";
		else tempTalent1 = "Specialist Weapon Group \[Longbow\]";
		
	}
	$("#"+id+"Check").show();
	$("#"+id).attr("class",$("#"+id).attr("class")+" span-result-done");
	
	if((!$("#AethyricAttunementCheck").is(":hidden") || !$("#SpecialistWeaponCheck").is(":hidden")) &&  (!$("#SavvyCheck").is(":hidden") || !$("#CoolheadedCheck").is(":hidden"))){
		$("#continueToStep5").show();
	}
}

function keepTalent (which) {
	if (which==0) {
		$("#halfRollDiv").hide();
		$("#halfKeep").hide();
		$("#halfTalentCheck").show();
		$("#halfKeepDiv").attr("class",$("#halfKeepDiv").attr("class")+" span-result-done");
		tempTalent = $("#halfTalent").html();
		if(($("#GenealogyCheck").is(":visible") || $("#HeraldryCheck").is(":visible")) &&  ($("#CookCheck").is(":visible") || $("#FarmerCheck").is(":visible"))){
			if($("#halfTalentCheck").is(":visible"))$("#continueToStep5").show();
		}
	}
	else {
		$("#humRollDiv"+which).hide();
		$("#humKeep"+which).hide();
		$("#humTalentCheck"+which).show();
		$("#humKeepDiv"+which).attr("class",$("#humKeepDiv"+which).attr("class")+" span-result-done");
		if (which==1) tempTalent1 = $("#humTalent"+which).html();
		else tempTalent2 = $("#humTalent"+which).html();
		if(!$("#humTalentCheck1").is(":hidden")) 
			if(!$("#humTalentCheck2").is(":hidden")) $("#continueToStep5").show();
	}
}

function rollTalent (thisRace,which) {
	var talent = randomTalent(thisRace);
	while(true) {
		if (talent == $("#humTalent"+1).html() || talent == $("#humTalent"+2).html()) talent = randomTalent(thisRace);
		else break;
	}
	if (thisRace == "Halfling") {
		$("#halfTalent").html(talent);
		$("#halfTalent").attr("style","max-height:54px !important;min-height:54px !important; font-weight: bold !important;");
		$("#halfKeepDiv").show();
	}
	else {
		$("#humTalent"+which).html(talent);
		$("#humTalent"+which).attr("style","max-height:54px !important;min-height:54px !important; font-weight: bold !important;");
		$("#humKeepDiv"+which).show();
	}
}

function randomTalent (thisRace) {
	var rollUnits = Math.floor(Math.random() * 10) + 1;
	var rollTenths = Math.floor(Math.random() * 10);
	var result = rollTenths*10+rollUnits;
	var talent = "";
	if(thisRace=="Halfling") {
		if (inBetween(result,1,5)) talent = "Acute Hearing";
		if (inBetween(result,6,10)) talent = "Ambidextrous";
		if (inBetween(result,11,15)) talent = "Coolheaded";
		if (inBetween(result,16,20)) talent = "Excellent Vision";
		if (inBetween(result,21,25)) talent = "Fleet Footed";
		if (inBetween(result,26,29)) talent = "Hardy";
		if (inBetween(result,30,33)) talent = "Lightning Reflexes";
		if (inBetween(result,34,38)) talent = "Luck";
		if (inBetween(result,39,42)) talent = "Marksman";
		if (inBetween(result,43,47)) talent = "Mimic";
		if (inBetween(result,48,51)) talent = "Resistance to Disease";
		if (inBetween(result,52,53)) talent = "Resistance to Magic";
		if (inBetween(result,54,57)) talent = "Resistance to Poison";
		if (inBetween(result,58,62)) talent = "Savvy";
		if (inBetween(result,63,67)) talent = "Sixth Sense";
		if (inBetween(result,68,72)) talent = "Strong Minded";
		if (inBetween(result,73,77)) talent = "Sturdy";
		if (inBetween(result,78,82)) talent = "Suave";
		if (inBetween(result,83,87)) talent = "Super Numerate";
		if (inBetween(result,88,91)) talent = "Very Resilient";
		if (inBetween(result,92,95)) talent = "Very Strong";
		if (inBetween(result,96,100)) talent = "Warrior Born";
	}
	else {
		if (inBetween(result,1,4)) talent = "Acute Hearing";
		if (inBetween(result,5,9)) talent = "Ambidextrous";
		if (inBetween(result,10,13)) talent = "Coolheaded";
		if (inBetween(result,14,18)) talent = "Excellent Vision";
		if (inBetween(result,19,22)) talent = "Fleet Footed";
		if (inBetween(result,23,27)) talent = "Hardy";
		if (inBetween(result,28,31)) talent = "Lightning Reflexes";
		if (inBetween(result,32,35)) talent = "Luck";
		if (inBetween(result,36,40)) talent = "Marksman";
		if (inBetween(result,41,44)) talent = "Mimic";
		if (inBetween(result,45,49)) talent = "Night Vision";
		if (inBetween(result,50,53)) talent = "Resistance to Disease";
		if (inBetween(result,54,57)) talent = "Resistance to Magic";
		if (inBetween(result,58,61)) talent = "Resistance to Poison";
		if (inBetween(result,62,66)) talent = "Savvy";
		if (inBetween(result,67,71)) talent = "Sixth Sense";
		if (inBetween(result,72,75)) talent = "Strong Minded";
		if (inBetween(result,76,79)) talent = "Sturdy";
		if (inBetween(result,80,83)) talent = "Suave";
		if (inBetween(result,84,87)) talent = "Super Numerate";
		if (inBetween(result,88,91)) talent = "Very Resilient";
		if (inBetween(result,92,95)) talent = "Very Strong";
		if (inBetween(result,96,100)) talent = "Warrior Born";		
	}
	WL.Logger.debug("rolled "+talent);
	return talent;
}

function selectHalflingSkill (base,id,baseAttr) {
	
	var optSkillsArray = [];
	if (id == "Genealogy" || id == "Heraldry") optSkillsArray = ["Genealogy","Heraldry"];
	else optSkillsArray = ["Farmer","Cook"];
	var optSkillsArrayLength = optSkillsArray.length;
	for (i=0;i<optSkillsArrayLength;i++) {
		if (optSkillsArray[i].localeCompare(id)!=0) {
			$("#"+optSkillsArray[i]).attr("class","item item-icon-right span-smalltext");
			$("#"+optSkillsArray[i]+"Check").hide();
		}
	}
	var newField = base+" \["+id+"\]";
	if (id == "Genealogy" || id == "Heraldry") tempSkill1 = newField;
	else tempSkill2 = newField;

	$("#"+id+"Check").show();
	$("#"+id).attr("class",$("#"+id).attr("class")+" span-result-done");
	if((!$("#GenealogyCheck").is(":hidden") || !$("#HeraldryCheck").is(":hidden")) &&  (!$("#CookCheck").is(":hidden") || !$("#FarmerCheck").is(":hidden"))){
		if(!$("#halfTalentCheck").is(":hidden")) $("#continueToStep5").show();
	}
	
}

function inBetween(test,lower,upper) {
	if (test >= lower && test <= upper) return true;
	else return false;
}

function confirmRacialFeatures () {
	switch (character.race) {
	case "Dwarf":
		character.advancedSkills[tempSkill] = 0;
		break;
	case "Elf":
		character.talents[tempTalent1]="";
		character.talents[tempTalent2]="";
		break;
	case "Halfling":
		character.advancedSkills[tempSkill1] = 0;
		character.advancedSkills[tempSkill2] = 0;
		character.talents[tempTalent]="";
	case "Human":
		character.talents[tempTalent1]="";
		character.talents[tempTalent2]="";
	default:
		break;
	}
	character.step4completed=true;
	goToCCStep5();
}

////////// STEP 5 //////////

function goToCCStep5() {

	$('#myContent').html('');
	$('#myContent').load('html/charCreation/cc_step5.html',function() {
		// write race into race label
		$("#race").html(character.race);
		if (!character.step5completed){
			$("#continueToStep6").hide();
			rolledCareers=[];
		}
		else $("#continueToStep6").show();
//		if(tempCareer!="") {
//			newCareer(tempCareer);		// THIS IS BUGGED AND I DON'T KNOW WHY
//			chooseCareer(0);
//		}
		$('#backButton').show();
		$('#backButton').attr("onclick","goToCCStep4()");
		//WL.App.overrideBackButton(goToCCStep2());
	});
}

function newCareer (forced) {
	
	var career = "";
	var careerID = -1;
	if (!forced || forced=="") {
		careerID = rollCareer();
		//console.log("id = "+careerID);
		career=careers[careerID];
		console.log("career = "+JSON.stringify(career));
		rolledCareers.push(careerID);
	}
	else career=forced;
	var careerSpan = "<a id=\""+careerID+"\" class=\"item item-icon-right selected-career\" href=\"#\" onclick=\"chooseCareer(this.id)\">"+
    career.label+
    "<i id=\"career"+careerID+"CheckOutline\" class=\"icon ion-ios-circle-outline\"></i><i id=\"career"+careerID+"Check\" class=\"icon ion-ios-checkmark\"></i></a>";
	$("#careerList a:first").after(careerSpan);
	$("#career"+careerID+"Check").hide();
	for(i=0;i<rolledCareers.length;i++) $("#"+rolledCareers[i]).attr("class","item item-icon-right");
	careerCount++;
}

function getCareerIdByLabel (label) {	// never used, consider trashing
	for (i=0;i<careers.length;i++) if (careers[i].label=label) return i;
}

function chooseCareer(index) {
	//alert("showing "+"#career"+index+"Check");
	//$("#career"+index+"CheckOutline").hide();
	$("#career"+index+"Check").show();
	tempCareer=careers[index];
	for(i=0;i<rolledCareers.length;i++) {
		if(!(rolledCareers[i]==index)) {
			$("#career"+rolledCareers[i]+"Check").hide();
			$("#career"+rolledCareers[i]+"CheckOutline").show();
			//alert("hiding "+"#career"+rolledCareers[i]+"Check");
		}
	}
	$("#continueToStep6").show();
}

function rollCareer () {
	var rollUnits = Math.floor(Math.random() * 10) + 1;
	var rollTenths = Math.floor(Math.random() * 10);
	var result = rollTenths*10+rollUnits;
	var career = "";
	switch (character.race) {
	case "Dwarf":
		if(inBetween(result,1,2)) career=0;
		if(inBetween(result,3,6)) career=5;
		if(inBetween(result,7,10)) career=8;
		if(inBetween(result,11,12)) career=11;
		if(inBetween(result,13,15)) career=12;
		if(inBetween(result,16,19)) career=20;
		if(inBetween(result,20,23)) career=22;
		if(result==24) career=25;
		if(inBetween(result,25,30)) career=26;
		if(inBetween(result,31,34)) career=28;
		if(inBetween(result,35,40)) career=29;
		if(inBetween(result,41,42)) career=30;
		if(inBetween(result,43,45)) career=32;
		if(inBetween(result,46,50)) career=35;
		if(inBetween(result,51,54)) career=36;
		if(inBetween(result,55,58)) career=37;
		if(inBetween(result,59,63)) career=40;
		if(inBetween(result,64,65)) career=41;
		if(result==66) career=42;
		if(inBetween(result,67,68)) career=43;
		if(inBetween(result,69,72)) career=44;
		if(inBetween(result,73,75)) career=45;
		if(inBetween(result,76,79)) career=46;
		if(inBetween(result,80,81)) career=48;
		if(inBetween(result,82,84)) career=50;
		if(inBetween(result,85,87)) career=52;
		if(inBetween(result,88,90)) career=53;
		if(inBetween(result,91,94)) career=54;
		if(inBetween(result,95,98)) career=55;
		if(inBetween(result,99,100)) career=58;
		break;
	case "Elf":
		if(inBetween(result,1,7)) career=1;
		if(inBetween(result,8,12)) career=12;
		if(inBetween(result,13,19)) career=13;
		if(inBetween(result,20,27)) career=20;
		if(inBetween(result,28,34)) career=24;
		if(inBetween(result,35,39)) career=26;
		if(inBetween(result,40,45)) career=27;
		if(inBetween(result,46,51)) career=32;
		if(inBetween(result,52,57)) career=33;
		if(inBetween(result,58,63)) career=39;
		if(inBetween(result,64,69)) career=41;
		if(inBetween(result,70,75)) career=42;
		if(inBetween(result,76,80)) career=48;
		if(inBetween(result,81,86)) career=49;
		if(inBetween(result,87,93)) career=53;
		if(inBetween(result,94,100)) career=55;
		break;
	case "Halfling":
		if(inBetween(result,1,3)) career=0;
		if(result==4) career=3;
		if(result==5) career=6;
		if(inBetween(result,6,7)) career=7;
		if(inBetween(result,8,9)) career=8;
		if(inBetween(result,10,11)) career=9;
		if(inBetween(result,12,14)) career=10;
		if(inBetween(result,15,17)) career=12;
		if(result==18) career=15;
		if(inBetween(result,19,22)) career=16;
		if(result==23) career=17;
		if(inBetween(result,24,26)) career=18;
		if(inBetween(result,27,31)) career=20;
		if(inBetween(result,32,35)) career=26;
		if(inBetween(result,36,40)) career=27;
		if(inBetween(result,41,45)) career=28;
		if(inBetween(result,46,48)) career=32;
		if(inBetween(result,49,54)) career=34;
		if(result==55) career=37;
		if(inBetween(result,56,60)) career=39;
		if(inBetween(result,61,65)) career=43;
		if(inBetween(result,66,68)) career=45;
		if(inBetween(result,69,70)) career=46;
		if(inBetween(result,71,72)) career=48;
		if(inBetween(result,73,78)) career=49;
		if(inBetween(result,79,80)) career=51;
		if(inBetween(result,81,85)) career=52;
		if(inBetween(result,86,90)) career=53;
		if(inBetween(result,91,94)) career=55;
		if(inBetween(result,95,96)) career=56;
		if(inBetween(result,97,100)) career=57;
		break;
	case "Human":
		if(inBetween(result,1,2)) career=0;
		if(inBetween(result,3,4)) career=1;
		if(result==5) career=2;
		if(result==6) career=3;
		if(inBetween(result,7,8)) career=4;
		if(inBetween(result,9,10)) career=5;
		if(inBetween(result,11,12)) career=6;
		if(inBetween(result,13,14)) career=7;
		if(inBetween(result,15,16)) career=8;
		if(inBetween(result,17,18)) career=9;
		if(inBetween(result,19,20)) career=10;
		if(inBetween(result,21,22)) career=11;
		if(inBetween(result,23,24)) career=12;
		if(result==25) career=14;
		if(result==26) career=15;
		if(inBetween(result,27,28)) career=17;
		if(inBetween(result,29,30)) career=18;
		if(result==31) career=19;
		if(inBetween(result,32,33)) career=20;
		if(inBetween(result,34,35)) career=21;
		if(result==36) career=22;
		if(result==37) career=23;
		if(inBetween(result,38,39)) career=25;
		if(inBetween(result,40,41)) career=26;
		if(inBetween(result,42,43)) career=27;
		if(inBetween(result,44,45)) career=28;
		if(inBetween(result,46,47)) career=29;
		if(inBetween(result,48,49)) career=30;
		if(result==50) career=31;
		if(inBetween(result,51,52)) career=32;
		if(inBetween(result,53,54)) career=33;
		if(inBetween(result,55,56)) career=34;
		if(inBetween(result,57,58)) career=35;
		if(inBetween(result,59,60)) career=36;
		if(inBetween(result,61,62)) career=37;
		if(inBetween(result,63,64)) career=38;
		if(inBetween(result,65,66)) career=39;
		if(inBetween(result,67,68)) career=41;
		if(inBetween(result,69,70)) career=42;
		if(inBetween(result,71,72)) career=43;
		if(inBetween(result,73,74)) career=45;
		if(inBetween(result,75,76)) career=46;
		if(inBetween(result,77,78)) career=47;
		if(inBetween(result,79,80)) career=48;
		if(inBetween(result,81,82)) career=49;
		if(inBetween(result,83,84)) career=50;
		if(inBetween(result,85,86)) career=51;
		if(inBetween(result,87,88)) career=52;
		if(inBetween(result,89,90)) career=53;
		if(inBetween(result,91,92)) career=55;
		if(inBetween(result,93,94)) career=56;
		if(inBetween(result,95,96)) career=57;
		if(inBetween(result,97,98)) career=58;
		if(inBetween(result,99,100)) career=59;
		break;
	default:
		break;
	}
	return career;
}

function confirmCareer() {
	//console.log(JSON.stringify(tempCareer));
	character.career=tempCareer;
	character.step5completed=true;
	//if(character.career.choices.hasSkillChoices) careerSkillChoices.size=character.career.choices.skillChoices.size;
	//if(character.career.choices.hasTalentChoices) careerTalentChoices.size=character.career.choices.talentChoices.size;
	goToCCStep6();
}

////////// STEP 6 //////////

function goToCCStep6() {

	$('#myContent').html('');
	if (isStep6Necessary()) {
	$('#myContent').load('html/charCreation/cc_step6.html',function() {
		// write career into career label
		$("#career").html(character.career.label);
		if (!character.step6completed){
			$("#continueToStep7").hide();
			
		}
		else $("#continueToStep7").show();
		renderStep6();
		$('#backButton').show();
		$('#backButton').attr("onclick","goToCCStep5()");
		//WL.App.overrideBackButton(goToCCStep5());
	});
	}
	else goToCCStep7 ();
}

function isStep6Necessary () {
	if (character.career.choices.hasSkillChoice || character.career.choices.hasTalentChoice) {
		return true;
	}
	else return false;
}

function renderStep6 () {
	if (character.career.choices.hasSkillChoice) {
		var skillTab = "";
		skillTab+="<div class=\"item item-divider item-assertive\" style=\"margin-top:20px !important\">Skills</div>";
		skillTab+="<div class=\"list\" style=\"border-top-color: #ddd; border-top-width: 1px; border-top-style: solid	\">";

		//if(!isCompleted) tempSkill1 = "";
		for (i=0;i<character.career.choices.skillChoices.length;i++) {
			var currentChoice = character.career.choices.skillChoices[i];
			skillTab+="<a href=\"#\" class=\"item\">Pick one of the following:</a>";
			for (j=0;j<currentChoice.length;j++) {
				var baseId = i+"skill"+renderLabelForID(currentChoice[j]);
				skillTab+="<a id=\""+baseId+"\" class=\"item item-icon-right span-smallertext\" href=\"#\" style=\"font-weight: bold\" onclick=\"inCareerChoice(this.id)\">"+currentChoice[j];
				skillTab+="<i id=\""+baseId+"Check\" class=\"icon ion-ios-checkmark-empty\" style=\"display:none\"></i></a>";
			}
			
		}
		skillTab+="</div>";
		$("#skillsChoice").html(skillTab);
		if(character.step6completed) {
			careerSkillChoices=[];
			for (i=0;i<skillsGlobal.length;i++) {
				inCareerChoice(i+"skill"+renderLabelForID(skillsGlobal[i]));
				alert(i+"skill"+renderLabelForID(skillsGlobal[i]));
			}
		}
	}
	if (character.career.choices.hasTalentChoice) {
		var talentTab = "";
		talentTab+="<div class=\"item item-divider item-assertive\">Talents</div>";
		talentTab+="<div class=\"list\" style=\"border-top-color: #ddd; border-top-width: 1px; border-top-style: solid	\">";

		//if(!isCompleted) tempSkill1 = "";
		for (i=0;i<character.career.choices.talentChoices.length;i++) {
			var currentChoice = character.career.choices.talentChoices[i];
			talentTab+="<a href=\"#\" class=\"item\">Pick one of the following:</a>";
			for (j=0;j<currentChoice.length;j++) {
				var baseId = i+"talent"+renderLabelForID(currentChoice[j]);
				var isDouble = false;
				for(k in character.talents) if (currentChoice[j].localeCompare(k)==0) isDouble = true;
				talentTab+="<a id=\""+baseId+"\" class=\"item item-icon-right span-smallertext\" href=\"#\" ";
				if(isDouble && !character.step6completed) talentTab+="style=\"font-weight: bold; color: #bfbfbf !important;\">";	//no onclick and greyed out if double
				else talentTab+= "style=\"font-weight: bold\" onclick=\"inCareerChoice(this.id)\">";
				talentTab+=currentChoice[j];
				talentTab+="<i id=\""+baseId+"Check\" class=\"icon ion-ios-checkmark-empty\" style=\"display:none\"></i></a>";
				
			}
			
		}
		talentTab+="</div>";
		$("#talentsChoice").html(talentTab);
		if(character.step6completed) {
			careerTalentChoices=[];
			for (i=0;i<talentsGlobal.length;i++) {
				inCareerChoice(i+"talent"+renderLabelForID(talentsGlobal[i]));
				alert(i+"talent"+renderLabelForID(talentsGlobal[i]));
			}
		}
	}	
}

function inCareerChoice (id) {
	//reinizializzare variabile globale a vettore avente length pari alla length di skillChoice/talentChoice...
	var choiceNumber = id.substring(0,1);
	var type = "";
	if (id.substring(1,4)=="tal") type = "talent";
	else type = "skill";
	$("#"+id+"Check").show();
	$("#"+id).attr("class",$("#"+id).attr("class")+" span-result-done");
	
	if (type=="talent") {
		for(k=0;k<character.career.choices.talentChoices[choiceNumber].length;k++) {
			if(choiceNumber+type+renderLabelForID(character.career.choices.talentChoices[choiceNumber][k])==id) {
				careerTalentChoices[choiceNumber]=character.career.choices.talentChoices[choiceNumber][k];
			}
		}
		for(i=0;i<character.career.choices.talentChoices[choiceNumber].length;i++) {
			var thisID = choiceNumber+type+renderLabelForID(character.career.choices.talentChoices[choiceNumber][i]);
			if(!thisID.localeCompare(id)==0) {
				$("#"+thisID+"Check").hide();
				$("#"+thisID).attr("class","item item-icon-right span-smallertext");
			}
		} 
	}
	else {
		for(k=0;k<character.career.choices.skillChoices[choiceNumber].length;k++) {
			if(choiceNumber+type+renderLabelForID(character.career.choices.skillChoices[choiceNumber][k])==id) {
				careerSkillChoices[choiceNumber]=character.career.choices.skillChoices[choiceNumber][k];
			}
		}
		for(i=0;i<character.career.choices.skillChoices[choiceNumber].length;i++) {
			var thisID = choiceNumber+type+renderLabelForID(character.career.choices.skillChoices[choiceNumber][i]);
			if(thisID!=id) {
				$("#"+thisID+"Check").hide();
				$("#"+thisID).attr("class","item item-icon-right span-smallertext");		
			}
		}
	}
	$("#continueToStep7").show();
}

function confirmCareerChoices() {
	skillsGlobal = careerSkillChoices;
	talentsGlobal = careerTalentChoices;
	
	console.log(skillsGlobal);
	console.log(talentsGlobal);
	for (i=0;i<careerTalentChoices.length;i++) character.talents[careerTalentChoices[i]]="";
	for (i=0;i<careerSkillChoices.length;i++) {
		
		for(x in character.basicSkills) {
			if (careerSkillChoices[i]==x) {
				character.basicSkills[x]++;		// add a point to an already known skill
				careerSkillChoices.splice(i,1);	// delete that skill from the temporary variable
			}
			
		}

		for(x in character.advancedSkills) {
			if (careerSkillChoices[i]==x) {
				character.advancedSkills[x]++;	// same as up there
				careerSkillChoices.splice(i,1);
			}
		}
		
		for(i=0;i<careerSkillChoices.length;i++) character.advancedSkills[careerSkillChoices[i]]=0;
	}
	var tempSkills = character.career.skills;
	for (i=0;i<tempSkills.length;i++) {
		
		for(x in character.basicSkills) {
			if (tempSkills[i]==x) {
				character.basicSkills[x]++;		// add a point to an already known skill
				tempSkills.splice(i,1);	// delete that skill from the temporary variable
			}
			
		}

		for(x in character.advancedSkills) {
			if (tempSkills[i]==x) {
				character.advancedSkills[x]++;	// same as up there
				tempSkills.splice(i,1);
			}
		}
		
		for(i=0;i<tempSkills.length;i++) character.advancedSkills[tempSkills[i]]=0;
	}
	
	console.log("//// BASIC SKILLS: ////");
	for (z in character.basicSkills) console.log(z+": "+character.basicSkills[z]);
	console.log("//// ADVANCED SKILLS: ////");
	for (k in character.advancedSkills) console.log(k+": "+character.advancedSkills[k]);
	character.step6completed=true;
	goToCCStep7();
}




/////// STEP 7 /////////

function goToCCStep7() {
	$('#myContent').html('');
	
	$('#myContent').load('html/charCreation/cc_step7.html',function() {
		// write race into race label
		$("#career").html(character.career.label);
		if (!character.step6completed){
			$("#continueToStep8").hide();
			
		}
		else $("#continueToStep7").show();
		renderStep7();
		$('#backButton').show();
		$('#backButton').attr("onclick","goToCCStep6()");
		//WL.App.overrideBackButton(goToCCStep5());
	});
	
}

function renderStep7() {
	var mainAttrs = "";
	mainAttrs+="<div class=\"item item-divider item-assertive\" style=\"margin-top:20px !important\">Main Attributes</div>";
	mainAttrs+="<div class=\"list\" style=\"border-top-color: #ddd; border-top-width: 1px; border-top-style: solid	\">";

	//if(!isCompleted) tempSkill1 = "";
	for (i=0;i<character.career.mainAdvancements.length;i++) {
		var currentChoice = character.career.mainAdvancements[i];
		mainAttrs+="<a id=\""+currentChoice+"\" class=\"item item-icon-right\" href=\"#\" style=\"font-weight: bold\" onclick=\"freeRaise(this.id)\">"+labelToFullName(currentChoice);
		mainAttrs+="<span class=\"span-result span-result-done\" id=\""+currentChoice+"Val\">"+character.primaryAttributes[currentChoice]+"</span>";
		mainAttrs+="<i id=\""+currentChoice+"Raise\" class=\"icon ion-arrow-up-a\" style=\"color: rgb(222,222,217)\"></i></a>";
		
	}
	$("#mainAttributesRaise").html(mainAttrs);
	
	var secAttrs = "";
	secAttrs+="<div class=\"item item-divider item-assertive\" style=\"margin-top:20px !important\">Secondary Attributes</div>";
	secAttrs+="<div class=\"list\" style=\"border-top-color: #ddd; border-top-width: 1px; border-top-style: solid	\">";

	//if(!isCompleted) tempSkill1 = "";
	for (i=0;i<character.career.secondaryAdvancements.length;i++) {
		var currentChoice = character.career.secondaryAdvancements[i];
		secAttrs+="<a id=\""+currentChoice+"\" class=\"item item-icon-right\" href=\"#\" style=\"font-weight: bold\" onclick=\"freeRaise(this.id)\">"+labelToFullName(currentChoice);
		secAttrs+="<span class=\"span-result span-result-done\" id=\""+currentChoice+"Val\">"+character.secondaryAttributes[currentChoice]+"</span>";
		secAttrs+="<i id=\""+currentChoice+"Raise\" class=\"icon ion-arrow-up-a\" style=\"color: rgb(222,222,217)\"></i></a>";
	
	}
	$("#secondaryAttributesRaise").html(secAttrs);
}

function freeRaise(id) {
	//alert("id = "+id);
	var isPrimary = false;
	for (z in character.primaryAttributes) {
		//alert("z is "+z+" vs id = "+id);
		if(id==z) {
		isPrimary=true;
			//alert("it's primary!");
			break;
		}
	}
	if(isPrimary) $("#"+id+"Val").html(parseInt($("#"+id+"Val").html())+5);
	else $("#"+id+"Val").html(parseInt($("#"+id+"Val").html())+1);
	
	$("#"+id+"Raise").attr("style","color: #ffc900");
	$("#"+id).attr("onclick","");
	//change onclick
	for (i=0;i<character.career.mainAdvancements.length;i++) {
		if(!(character.career.mainAdvancements[i]==id)) {
			$("#"+character.career.mainAdvancements[i]+"Raise").attr("style","color: rgb(222,222,217)");
			$("#"+character.career.mainAdvancements[i]+"Val").html(character.primaryAttributes[character.career.mainAdvancements[i]]);
			$("#"+character.career.mainAdvancements[i]).attr("onclick","freeRaise(this.id)");
			globalFreeRaise = character.career.mainAdvancements[i];
		}
	}
	for (i=0;i<character.career.secondaryAdvancements.length;i++) {
		if(!(character.career.secondaryAdvancements[i]==id)) {
			$("#"+character.career.secondaryAdvancements[i]+"Raise").attr("style","color: rgb(222,222,217)");
			$("#"+character.career.secondaryAdvancements[i]+"Val").html(character.secondaryAttributes[character.career.secondaryAdvancements[i]]);
			$("#"+character.career.secondaryAdvancements[i]).attr("onclick","freeRaise(this.id)");
			globalFreeRaise = character.career.secondaryAdvancements[i];
		}
	}
}

function labelToFullName (label) {
	switch (label) {
	case "WS":
		return "Weapon Skill";
	case "BS":
		return "Balistic Skill";
	case "S":
		return "Strength";
	case "T":
		return "Toughness";
	case "Ag":
		return "Agility";
	case "WP":
		return "Willpower";
	case "Int":
		return "Intelligence";
	case "Fel":
		return "Fellowship";
		
	case "A":
		return "Attacks";
	case "W":
		return "Wounds";
	case "SB":
		return "Strength Bonus";
		break;
	case "TB":
		return "Toughness Bonus";
		break;
	case "M":
		return "Movement";
	case "Mag":
		return "Magic";
	case "IP":
		return "Instanity Points";
	case "FP":
		return "Fate Points";
	default:
		return "pippo";
		break;
	}
}

function confirmFreeRaise () {
	character.freeAdvancement=globalFreeRaise;
	goToCCStep8();
}

/////////  STEP 8  ///////////

function goToCCStep8 () {
	$('#myContent').html('');
	
	$('#myContent').load('html/charCreation/cc_step8.html',function() {
		// write race into race label
		$("#race").html(character.race);
		
		$('#backButton').show();
		$('#backButton').attr("onclick","goToCCStep7()");
		//WL.App.overrideBackButton(goToCCStep5());
	});
}

function rollFName () {
	var rollUnits = Math.floor(Math.random() * 10) + 1;
	var rollTenths = Math.floor(Math.random() * 10);
	var result = rollTenths*10+rollUnits;
	
	switch (character.race) {
	case "Dwarf":
		return "Zio";
	case "Elf":
		return "Nani";
	case "Halfling":
		return "Mona";
	case "Human":
		return "Senti";
	default:
		break;
	}
}

function rollLName () {
	var rollUnits = Math.floor(Math.random() * 10) + 1;
	var rollTenths = Math.floor(Math.random() * 10);
	var result = rollTenths*10+rollUnits;
	
	switch (character.race) {
	case "Dwarf":
		return "Zio";
	case "Elf":
		return "Nani";
	case "Halfling":
		return "Mona";
	case "Human":
		return "Senti";
	default:
		break;
	}
}

function confirmName() {
	var fName = $("#fNameInput").val();
	var lName = $("#lNameInput").val();
	
	if(fName.length==0) alert("Insert first name");
	if(fName.length > 15) alert("First name too long");
	if(lName.length > 15) alert("Last name too long");
	//alert(fName.length+" "+lName.length);
	if(!(fName.length==0) && !(fName.length > 12) && !(lName.length > 12)) {
		character.firstName = fName;
		character.lastName = lName;
		goToCCResume();
	}
	
}


//////////////////

function goToCCResume() {
	$('#myContent').html('');
	
	$('#myContent').load('html/charCreation/cc_step9.html',function() {
		// write race into race label
		$("#fName").html(character.firstName);
		$("#lName").html(character.lastName);
		$("#sex").html("M");
		renderResume();
		$('#backButton').show();
		$('#backButton').attr("onclick","goToCCStep7()");
		//WL.App.overrideBackButton(goToCCStep5());
	});
}

function renderResume () {
	var tRow="";
	for (x in character.primaryAttributes) {
		tRow+="<tr>";
		tRow+="<td class=\"td-wide\" id=\""+x+"\">"+x+"<\/td><td class=\"td-narrow\">"+character.primaryAttributes[x]+"<\/tr>";
		// if talent
		// else
		// if freeraise
		// else
	}
}