//each pair show acceptable increment: i.e. [0,1] is (x+0) and (y+1)
var moveArray = [[-1, 0], [1, 0], [0, -1], [0, 1]];

//each pair show acceptable increment: i.e. [0,1] is (x+0) and (y+1) of each set (line of fire)
var shootArray = {
	one_linear: [
		[[0, 1]],
		[[0, -1]],
		[[1, 0]],
		[[-1, 0]]
	],
	two_linear: [
		[[0, 1], [0, 2]],
		[[0, -1], [0, -2]],
		[[1, 0], [2, 0]],
		[[-1, 0], [-2, 0]]
	],
	three_linear: [
		[[0, 1], [0, 2], [0, 3]],
		[[0, -1], [0, -2], [0, -3]],
		[[1, 0], [2, 0], [3, 0]],
		[[-1, 0], [-2, 0], [-3, 0]]
	],
	two_diaganol: [
		[[-1, -1], [-2, -2]],
		[[1, 1], [2, 2]],
		[[1, -1], [2, -2]],
		[[-1, 1], [-2, 2]]
	],
};

//[faction, unit, health, direction(initial, then changes), shootsDiagonal, shootArray, canForceHit, scale, shootSound, explodeSound, minifigToEjectWhenHit, shotRangeImage, initialHealth]
var pieces = {
	E_darth_army: ['empire', 'hero_army', 3, 'left', false, shootArray.one_linear, true, 0.7, 'audioPieceShootArmy', 'audioPieceExplodeA', 'empire_army_down_1', 'one_linear', 3],
	E_army: ['empire', 'army', 4, 'left', false, shootArray.one_linear, false, 0.7, 'audioPieceShootArmy', 'audioPieceExplodeA', 'empire_army_right_1', 'one_linear', 4],
	E_army2: ['empire', 'army', 4, 'left', false, shootArray.one_linear, false, 0.7, 'audioPieceShootArmy', 'audioPieceExplodeA', 'empire_army_right_1', 'one_linear', 4],
	E_atat: ['empire', 'vehicle', 3, 'left', false, shootArray.three_linear, false, 1, 'audioPieceShootAtAt', 'audioPieceExplodeA', 'empire_army_down_1', 'three_linear', 3],
	E_atat2: ['empire', 'vehicle', 3, 'left', false, shootArray.three_linear, false, 1, 'audioPieceShootAtAt', 'audioPieceExplodeA', 'empire_army_down_1', 'three_linear', 3],
	E_atst: ['empire', 'rider', 2, 'left', true, shootArray.two_diaganol, false, 1, 'audioPieceShootAtSt', 'audioPieceExplodeA', 'empire_rider_minifig', 'two_diaganol', 2],
	E_cannon: ['empire', 'cannon', 3, 'left', false, shootArray.two_linear, false, 1, 'audioPieceShootEmpireCannon', 'audioPieceExplodeA', 'empire_army_right_1', 'two_linear', 3],
	R_luke_army: ['rebel', 'hero_army', 3, 'right', false, shootArray.one_linear, true, 0.7, 'audioPieceShootArmy', 'audioPieceExplodeB', 'rebel_army_right_1', 'one_linear', 3],
	R_army: ['rebel', 'army', 4, 'right', false, shootArray.one_linear, false, 0.7, 'audioPieceShootArmy', 'audioPieceExplodeB', 'rebel_army_down_1', 'one_linear', 4],
	R_army2: ['rebel', 'army', 4, 'right', false, shootArray.one_linear, false, 0.7, 'audioPieceShootArmy', 'audioPieceExplodeB', 'rebel_army_down_1', 'one_linear', 4],
	R_speeder: ['rebel', 'vehicle', 3, 'right', false, shootArray.three_linear, false, 1, 'audioPieceShootSpeeder', 'audioPieceExplodeB', 'empire_army_left_1', 'three_linear', 3],   //we can use back of stormtrooper for speeder pilot
	R_speeder2: ['rebel', 'vehicle', 3, 'right', false, shootArray.three_linear, false, 1, 'audioPieceShootSpeeder', 'audioPieceExplodeB', 'empire_army_left_1', 'three_linear', 3],   //we can use back of stormtrooper for speeder pilot
	R_tauntaun: ['rebel', 'rider', 2, 'right', true, shootArray.two_diaganol, false, 1, 'audioPieceShootTauntaun', 'audioPieceExplodeB', 'rebel_rider_minifig', 'two_diaganol', 2],
	R_cannon: ['rebel', 'cannon', 3, 'right', false, shootArray.two_linear, false, 1, 'audioPieceShootRebelCannon', 'audioPieceExplodeB', 'rebel_army_left_1', 'two_linear', 3]
};

//========= map 1 ===================
//[y, x, backgroundTileName(N,E,S,W), pieceObject, baseFaction]
var tilesInit1 =
[
	[	
		[0, 2, '0000', null, null],
		[1, 1, '0110', pieces.R_army, 'rebel'],
		[2, 1, '1110', pieces.R_tauntaun, 'rebel'],
		[3, 0, '1010', pieces.R_luke_army, 'rebel'],
		[4, 0, '1100', pieces.R_speeder, 'rebel'],
		[5, -1, '0000', null, null],
	],
	[
		[1, 2, '0000', null, null],
		[2, 2, '0101', null, null],
		[3, 1, '0111', null, null],
		[4, 1, '1110', null, null],
		[5, 0, '1001', null, null],
		[6, 0, '0000', null, null],
	],
	[	
		[2, 3, '0000', null, null],
		[3, 2, '0111', null, null],
		[4, 2, '1101', null, null],
		[5, 1, '0011', null, null],
		[6, 1, '1100', null, null],
		[7, 0, '0000', null, null],
	],
	[
		[3, 3, '0000', null, null],
		[4, 3, '0111', null, null],
		[5, 2, '1011', null, null],
		[6, 2, '1110', null, null],
		[7, 1, '1101', null, null],
		[8, 1, '0000', null, null],
	],
	[	[4, 4, '0000', null, null],
		[5, 3, '0011', null, null],
		[6, 3, '1100', null, null],
		[7, 2, '0111', null, null],
		[8, 2, '1101', null, null],
		[9, 1, '0000', null, null],
	],
	[
		[5, 4, '0000', null, null],
		[6, 4, '0110', null, null],
		[7, 3, '1011', null, null],
		[8, 3, '1101', null, null],
		[9, 2, '0101', null, null],
		[10, 2, '0000', null, null],
	],
	[
		[6, 5, '0000', null, null],
		[7, 4, '0011', pieces.E_atat, 'empire'],
		[8, 4, '1010', pieces.E_darth_army, 'empire'],
		[9, 3, '1011', pieces.E_atst, 'empire'],
		[10, 3, '1001', pieces.E_army, 'empire'],
		[11, 2, '0000', null, null],
	]
];

//========= map 2 ===================
//[y, x, backgroundTileName(N,E,S,W), pieceObject]
var tilesInit2 =
[
	[	
		[0, 2, '0000', null, null],
		[1, 1, '0110', pieces.R_tauntaun, 'rebel'],
		[2, 1, '1110', pieces.R_army, 'rebel'],
		[3, 0, '1010', pieces.R_luke_army, 'rebel'],
		[4, 0, '1100', pieces.R_speeder, 'rebel'],
		[5, -1, '0000', null, null],
	],
	[
		[1, 2, '0000', null, null],
		[2, 2, '0101', null, null],
		[3, 1, '0011', null, null],
		[4, 1, '1110', null, null],
		[5, 0, '1101', null, null],
		[6, 0, '0000', null, null],
	],
	[	
		[2, 3, '0110', null, null],
		[3, 2, '1011', null, null],
		[4, 2, '1110', null, null],
		[5, 1, '1101', null, null],
		[6, 1, '0011', null, null],
		[7, 0, '1100', null, null],
	],
	[
		[3, 3, '0011', null, null],
		[4, 3, '1100', null, null],
		[5, 2, '0111', null, null],
		[6, 2, '1011', null, null],
		[7, 1, '1110', null, null],
		[8, 1, '1001', null, null],
	],

	[
		[4, 4, '0000', null, null],
		[5, 3, '0111', null, null],
		[6, 3, '1011', null, null],
		[7, 2, '1100', null, null],
		[8, 2, '0101', null, null],
		[9, 1, '0000', null, null],
	],
	[
		[5, 4, '0000', null, null],
		[6, 4, '0011', pieces.E_atat, 'empire'],
		[7, 3, '1010', pieces.E_darth_army, 'empire'],
		[8, 3, '1011', pieces.E_army, 'empire'],
		[9, 2, '1001', pieces.E_atst, 'empire'],
		[10, 2, '0000', null, null],
	]
];

//========= map 3 ===================
//[y, x, backgroundTileName(N,E,S,W), pieceObject]
var tilesInit3 =
[
	[	
		[0, 2, '0000', null, null],
		[1, 1, '0110', pieces.R_army, 'rebel'],
		[2, 1, '1110', pieces.R_tauntaun, 'rebel'],
		[3, 0, '1110', pieces.R_luke_army, 'rebel'],
		[4, 0, '1100', pieces.R_cannon, 'rebel'],
		[5, -1, '0000', null, null],
	],
	[
		[1, 2, '0110', null, null],
		[2, 2, '1001', null, null],
		[3, 1, '0111', null, null],
		[4, 1, '1101', null, null],
		[5, 0, '0011', null, null],
		[6, 0, '1100', null, null],
	],
	[	
		[2, 3, '0111', null, null],
		[3, 2, '1010', null, null],
		[4, 2, '1111', null, null],
		[5, 1, '1111', null, null],
		[6, 1, '1010', null, null],
		[7, 0, '1101', null, null],
	],
	[
		[3, 3, '0101', null, null],
		[4, 3, '0000', null, null],
		[5, 2, '0111', null, null],
		[6, 2, '1101', null, null],
		[7, 1, '0000', null, null],
		[8, 1, '0101', null, null],
	],
	[
		[4, 4, '0111', null, null],
		[5, 3, '1010', null, null],
		[6, 3, '1111', null, null],
		[7, 2, '1111', null, null],
		[8, 2, '1010', null, null],
		[9, 1, '1101', null, null],
	],
	[
		[5, 4, '0011', null, null],
		[6, 4, '1100', null, null],
		[7, 3, '0111', null, null],
		[8, 3, '1101', null, null],
		[9, 2, '0110', null, null],
		[10, 2, '1001', null, null],
	],
	[
		[6, 5, '0000', null, null],
		[7, 4, '0011', pieces.E_cannon, 'empire'],
		[8, 4, '1011', pieces.E_darth_army, 'empire'],
		[9, 3, '1011', pieces.E_atst, 'empire'],
		[10, 3, '1001', pieces.E_army, 'empire'],
		[11, 2, '0000', null, null],
	]
];

//========= map 4 ===================
//[y, x, backgroundTileName(N,E,S,W), pieceObject]
var tilesInit4 =
[
	[	
		[0, 2, '0000', null, null],
		[1, 1, '0110', null, 'rebel'],
		[2, 1, '1110', pieces.R_tauntaun, 'rebel'],
		[3, 0, '1110', pieces.R_luke_army, 'rebel'],
		[4, 0, '1100', null, 'rebel'],
		[5, -1, '0000', null, null],
	],
	[
		[1, 2, '0110', pieces.R_army, null],
		[2, 2, '1001', null, null],
		[3, 1, '0111', null, null],
		[4, 1, '1101', null, null],
		[5, 0, '0011', null, null],
		[6, 0, '1100',  pieces.R_army2, null],
	],
	[	
		[2, 3, '0111', null, null],
		[3, 2, '1010', null, null],
		[4, 2, '1111', null, null],
		[5, 1, '1111', null, null],
		[6, 1, '1010', null, null],
		[7, 0, '1101', null, null],
	],
	[
		[3, 3, '0111', null, null],
		[4, 3, '1010', null, null],
		[5, 2, '1101', null, null],
		[6, 2, '0111', null, null],
		[7, 1, '1010', null, null],
		[8, 1, '1101', null, null],
	],
	[
		[4, 4, '0111', null, null],
		[5, 3, '1010', null, null],
		[6, 3, '1111', null, null],
		[7, 2, '1111', null, null],
		[8, 2, '1010', null, null],
		[9, 1, '1101', null, null],
	],
	[
		[5, 4, '0011', pieces.E_army, null],
		[6, 4, '1100', null, null],
		[7, 3, '0111', null, null],
		[8, 3, '1101', null, null],
		[9, 2, '0110', null, null],
		[10, 2, '1001', pieces.E_army2, null],
	],
	[
		[6, 5, '0000', null, null],
		[7, 4, '0011', null, 'empire'],
		[8, 4, '1011', pieces.E_darth_army, 'empire'],
		[9, 3, '1011', pieces.E_atst, 'empire'],
		[10, 3, '1001', null, 'empire'],
		[11, 2, '0000', null, null],
	]
];

//========= map 5 ===================
//[y, x, backgroundTileName(N,E,S,W), pieceObject]
var tilesInit5 =
[
	[	
		[0, 2, '0000', null, null],
		[1, 1, '0110', pieces.R_army, 'rebel'],
		[2, 1, '1100', pieces.R_speeder, 'rebel'],
		[3, 0, '0110', pieces.R_speeder2, 'rebel'],
		[4, 0, '1100', pieces.R_army2, 'rebel'],
		[5, -1, '0000', null, null],
	],
	[
		[1, 2, '0100', null, null],
		[2, 2, '0111', null, null],
		[3, 1, '1101', null, null],
		[4, 1, '0111', null, null],
		[5, 0, '1111', null, null],
		[6, 0, '1100', null, null],
	],
	[	
		[2, 3, '0101', null, null],
		[3, 2, '0111', null, null],
		[4, 2, '1101', null, null],
		[5, 1, '0111', null, null],
		[6, 1, '1101', null, null],
		[7, 0, '0101', null, null],
	],
	[
		[3, 3, '0101', pieces.R_cannon, null],
		[4, 3, '0111', null, null],
		[5, 2, '1101', null, null],
		[6, 2, '0111', null, null],
		[7, 1, '1101', null, null],
		[8, 1, '0101', pieces.E_cannon, null],
	],
	[
		[4, 4, '0101', null, null],
		[5, 3, '0111', null, null],
		[6, 3, '1101', null, null],
		[7, 2, '0111', null, null],
		[8, 2, '1101', null, null],
		[9, 1, '0101', null, null],
	],
	[
		[5, 4, '0011', null, null],
		[6, 4, '1111', null, null],
		[7, 3, '1101', null, null],
		[8, 3, '0111', null, null],
		[9, 2, '1101', null, null],
		[10, 2, '0001', null, null],
	],
	[
		[6, 5, '0000', null, null],
		[7, 4, '0011', pieces.E_army2, 'empire'],
		[8, 4, '1001', pieces.E_atat, 'empire'],
		[9, 3, '0011', pieces.E_atat2, 'empire'],
		[10, 3, '1001', pieces.E_army, 'empire'],
		[11, 2, '0000', null, null],
	]
];

var shootOutcomes = [
	['missed'],
	['hit'],
	['force hit!'],
];

var turnStatusInit = { currentTurnFaction: 'rebel', moveCounter: 1, victory: false };

//==================================

var spriteAreas = {
	"frames": [
	
//====================================  gameboard tiles (filename:north-east-south-west)


		{
			"filename": '0000',
			"frame": { "x": 0, "y": 128, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},		
	//1000		
		{
			"filename": '0100',
			"frame": { "x": 512, "y": 1792, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		
	//0100
		{
			"filename": '1100',
			"frame": { "x": 256, "y": 128, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},

	//0010
		{
			"filename": '1010',
			"frame": { "x": 256, "y": 896, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": '0110',
			"frame": { "x": 0, "y": 256, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": '1110',
			"frame": { "x": 256, "y": 640, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": '0001',
			"frame": { "x": 512, "y": 1664, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": '1001',
			"frame": { "x": 0, "y": 384, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": '0101',
			"frame": { "x": 256, "y": 1024, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": '1101',
			"frame": { "x": 256, "y": 384, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": '0011',
			"frame": { "x": 256, "y": 256, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},

		{
			"filename": '1011',
			"frame": { "x": 256, "y": 768, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": '0111',
			"frame": { "x": 256, "y": 512, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": '1111',
			"frame": { "x": 512, "y": 1920, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},


//==================================== lukes army
		{
			"filename": "rebel_hero_army_down_3",
			"frame": { "x": 384, "y": 1154, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_hero_army_down_2",
			"frame": { "x": 384, "y": 1282, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_hero_army_down_1",
			"frame": { "x": 384, "y": 1410, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_hero_army_down_0",
			"frame": { "x": 384, "y": 1794, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_hero_army_left_3",
			"frame": { "x": 384, "y": 1538, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_hero_army_left_2",
			"frame": { "x": 384, "y": 1666, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_hero_army_left_1",
			"frame": { "x": 384, "y": 1794, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_hero_army_left_0",
			"frame": { "x": 384, "y": 1410, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},		
		{
			"filename": "rebel_hero_army_right_3",
			"frame": { "x": 384, "y": 1922, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_hero_army_right_2",
			"frame": { "x": 384, "y": 2050, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_hero_army_right_1",
			"frame": { "x": 384, "y": 2178, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_hero_army_right_0",
			"frame": { "x": 384, "y": 2562, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_hero_army_up_3",
			"frame": { "x": 384, "y": 2306, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_hero_army_up_2",
			"frame": { "x": 384, "y": 2434, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_hero_army_up_1",
			"frame": { "x": 384, "y": 2562, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_hero_army_up_0",
			"frame": { "x": 384, "y": 2178, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		
//==================================== rebel army
		{
			"filename": "rebel_army_down_4",
			"frame": { "x": 256, "y": 1152, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_down_3",
			"frame": { "x": 256, "y": 1280, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_down_2",
			"frame": { "x": 256, "y": 1408, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_down_1",
			"frame": { "x": 256, "y": 1536, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_down_0",
			"frame": { "x": 256, "y": 2048, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_up_4",
			"frame": { "x": 256, "y": 1664, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_up_3",
			"frame": { "x": 256, "y": 1792, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_up_2",
			"frame": { "x": 256, "y": 1920, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_up_1",
			"frame": { "x": 256, "y": 2048, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_up_0",
			"frame": { "x": 256, "y": 1536, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},		
		{
			"filename": "rebel_army_right_4",
			"frame": { "x": 256, "y": 2176, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_right_3",
			"frame": { "x": 256, "y": 2304, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_right_2",
			"frame": { "x": 256, "y": 2432, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_right_1",
			"frame": { "x": 256, "y": 2560, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_right_0",
			"frame": { "x": 256, "y": 3072, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_left_4",
			"frame": { "x": 256, "y": 2688, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_left_3",
			"frame": { "x": 256, "y": 2816, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_left_2",
			"frame": { "x": 256, "y": 2944, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_left_1",
			"frame": { "x": 256, "y": 3072, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_army_left_0",
			"frame": { "x": 256, "y": 2560, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},		
		
//====================================  darth vaders army
		{
			"filename": "empire_hero_army_down_3",
			"frame": { "x": 128, "y": 1154, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_hero_army_down_2",
			"frame": { "x": 128, "y": 1282, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_hero_army_down_1",
			"frame": { "x": 128, "y": 1410, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_hero_army_down_0",
			"frame": { "x": 128, "y": 1794, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_hero_army_left_3",
			"frame": { "x": 128, "y": 1538, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_hero_army_left_2",
			"frame": { "x": 128, "y": 1666, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_hero_army_left_1",
			"frame": { "x": 128, "y": 1794, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_hero_army_left_0",
			"frame": { "x": 128, "y": 1410, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},		
		{
			"filename": "empire_hero_army_right_3",
			"frame": { "x": 128, "y": 1922, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_hero_army_right_2",
			"frame": { "x": 128, "y": 2050, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_hero_army_right_1",
			"frame": { "x": 128, "y": 2178, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_hero_army_right_0",
			"frame": { "x": 128, "y": 2562, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_hero_army_up_3",
			"frame": { "x": 128, "y": 2306, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_hero_army_up_2",
			"frame": { "x": 128, "y": 2434, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_hero_army_up_1",
			"frame": { "x": 128, "y": 2562, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_hero_army_up_0",
			"frame": { "x": 128, "y": 2178, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		
//==================================== empire army
		{
			"filename": "empire_army_down_4",
			"frame": { "x": 0, "y": 1152, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_down_3",
			"frame": { "x": 0, "y": 1280, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_down_2",
			"frame": { "x": 0, "y": 1408, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_down_1",
			"frame": { "x": 0, "y": 1536, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_down_0",
			"frame": { "x": 0, "y": 2048, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_up_4",
			"frame": { "x": 0, "y": 1664, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_up_3",
			"frame": { "x": 0, "y": 1792, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_up_2",
			"frame": { "x": 0, "y": 1920, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_up_1",
			"frame": { "x": 0, "y": 2048, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_up_0",
			"frame": { "x": 0, "y": 1536, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},		
		{
			"filename": "empire_army_right_4",
			"frame": { "x": 0, "y": 2176, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_right_3",
			"frame": { "x": 0, "y": 2304, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_right_2",
			"frame": { "x": 0, "y": 2432, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_right_1",
			"frame": { "x": 0, "y": 2560, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_right_0",
			"frame": { "x": 0, "y": 3072, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_left_4",
			"frame": { "x": 0, "y": 2688, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_left_3",
			"frame": { "x": 0, "y": 2816, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_left_2",
			"frame": { "x": 0, "y": 2944, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_left_1",
			"frame": { "x": 0, "y": 3072, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_army_left_0",
			"frame": { "x": 0, "y": 2560, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},					

//==================================== snowspeeder
		{
			"filename": "rebel_vehicle_right_3",
			"frame": { "x": 512, "y": 768, "w": 256, "h": 128 },
			"rotated": true,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -30, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_vehicle_right_2",
			"frame": { "x": 512, "y": 896, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -30, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_vehicle_right_1",
			"frame": { "x": 512, "y": 1024, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -15, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_vehicle_right_0",
			"frame": { "x": 512, "y": 1536, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -30, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_vehicle_left_3",
			"frame": { "x": 512, "y": 1152, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -30, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 } 
		},
		{
			"filename": "rebel_vehicle_left_2",
			"frame": { "x": 512, "y": 1280, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -20, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_vehicle_left_1",
			"frame": { "x": 512, "y": 1408, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 10, "y": -15, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_vehicle_left_0",
			"frame": { "x": 512, "y": 1536, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -30, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_vehicle_down_3",
			"frame": { "x": 512, "y": 0, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -30, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_vehicle_down_2",
			"frame": { "x": 512, "y": 128, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -30, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_vehicle_down_1",
			"frame": { "x": 512, "y": 256, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -15, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_vehicle_down_0",
			"frame": { "x": 512, "y": 1536, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -30, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_vehicle_up_3",
			"frame": { "x": 512, "y": 384, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -30, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_vehicle_up_2",
			"frame": { "x": 512, "y": 512, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -20, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_vehicle_up_1",
			"frame": { "x": 512, "y": 640, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": -10, "y": -15, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_vehicle_up_0",
			"frame": { "x": 512, "y": 1536, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -30, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		
//==================================== rebel cannon
		{
			"filename": "rebel_cannon_right_3",
			"frame": { "x": 1344, "y": 768, "w": 128, "h": 128 },
			"rotated": true,
			"trimmed": true,
			"spriteSourceSize": { "x": 90, "y": -20, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_cannon_right_2",
			"frame": { "x": 1344, "y": 896, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 90, "y": -20, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_cannon_right_1",
			"frame": { "x": 1344, "y": 1024, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 90, "y": -20, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_cannon_right_0",
			"frame": { "x": 1344, "y": 1536, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 70, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_cannon_left_3",
			"frame": { "x": 1344, "y": 1152, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 } 
		},
		{
			"filename": "rebel_cannon_left_2",
			"frame": { "x": 1344, "y": 1280, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_cannon_left_1",
			"frame": { "x": 1344, "y": 1408, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_cannon_left_0",
			"frame": { "x": 1344, "y": 1536, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 70, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_cannon_down_3",
			"frame": { "x": 1344, "y": 0, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 40, "y": -20, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_cannon_down_2",
			"frame": { "x": 1344, "y": 128, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 40, "y": -20, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_cannon_down_1",
			"frame": { "x": 1344, "y": 256, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 40, "y": -20, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_cannon_down_0",
			"frame": { "x": 1344, "y": 1536, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 70, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_cannon_up_3",
			"frame": { "x": 1344, "y": 384, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 70, "y": -40, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_cannon_up_2",
			"frame": { "x": 1344, "y": 512, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 70, "y": -40, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_cannon_up_1",
			"frame": { "x": 1344, "y": 640, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 70, "y": -40, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_cannon_up_0",
			"frame": { "x": 1344, "y": 1536, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 70, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},		
		
//==================================== empire cannon
		{
			"filename": "empire_cannon_right_3",
			"frame": { "x": 1216, "y": 768, "w": 128, "h": 128 },
			"rotated": true,
			"trimmed": true,
			"spriteSourceSize": { "x": 70, "y": -40, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_cannon_right_2",
			"frame": { "x": 1216, "y": 896, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 70, "y": -40, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_cannon_right_1",
			"frame": { "x": 1216, "y": 1024, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 70, "y": -20, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_cannon_right_0",
			"frame": { "x": 1216, "y": 1536, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 60, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_cannon_left_3",
			"frame": { "x": 1216, "y": 1152, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 } 
		},
		{
			"filename": "empire_cannon_left_2",
			"frame": { "x": 1216, "y": 1280, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_cannon_left_1",
			"frame": { "x": 1216, "y": 1408, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": -40, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_cannon_left_0",
			"frame": { "x": 1216, "y": 1536, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 60, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_cannon_down_3",
			"frame": { "x": 1216, "y": 0, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 60, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_cannon_down_2",
			"frame": { "x": 1216, "y": 128, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 60, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_cannon_down_1",
			"frame": { "x": 1216, "y": 256, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 60, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_cannon_down_0",
			"frame": { "x": 1216, "y": 1536, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 60, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_cannon_up_3",
			"frame": { "x": 1216, "y": 384, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 70, "y": -50, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_cannon_up_2",
			"frame": { "x": 1216, "y": 512, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 70, "y": -50, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_cannon_up_1",
			"frame": { "x": 1216, "y": 640, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 70, "y": -50, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_cannon_up_0",
			"frame": { "x": 1216, "y": 1536, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 60, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
				
//==================================== at-at
		{
			"filename": "empire_vehicle_down_3",
			"frame": { "x": 1024, "y": 0, "w": 192, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -80,  "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_vehicle_down_2",
			"frame": { "x": 1024, "y": 192, "w": 192, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -80,  "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_vehicle_down_1",
			"frame": { "x": 1024, "y": 384, "w": 192, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -80,  "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_vehicle_down_0",
			"frame": { "x": 1024, "y": 2304, "w": 192, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 30, "y": -50,  "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_vehicle_up_3",
			"frame": { "x": 1024, "y": 576, "w": 192, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 30, "y": -80,  "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 } 
		},
		{
			"filename": "empire_vehicle_up_2",
			"frame": { "x": 1024, "y": 768, "w": 192, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 30, "y": -80,  "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_vehicle_up_1",
			"frame": { "x": 1024, "y": 960, "w": 192, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 30, "y": -80,  "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_vehicle_up_0",
			"frame": { "x": 1024, "y": 2304, "w": 192, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 30, "y": -50,  "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_vehicle_right_3",
			"frame": { "x": 1024, "y": 1152, "w": 192, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 30, "y": -80,  "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_vehicle_right_2",
			"frame": { "x": 1024, "y": 1344, "w": 192, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 40, "y": -80,  "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_vehicle_right_1",
			"frame": { "x": 1024, "y": 1536, "w": 192, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 30, "y": -80,  "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_vehicle_right_0",
			"frame": { "x": 1024, "y": 2304, "w": 192, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 30, "y": -50,  "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_vehicle_left_3",
			"frame": { "x": 1024, "y": 1728, "w": 192, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -80,  "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_vehicle_left_2",
			"frame": { "x": 1024, "y": 1920, "w": 192, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -80,  "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_vehicle_left_1",
			"frame": { "x": 1024, "y": 2112, "w": 192, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": -80,  "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_vehicle_left_0",
			"frame": { "x": 1024, "y": 2304, "w": 192, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 30, "y": -50,  "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},	
		
//==================================== tauntaun
		{
			"filename": "rebel_rider_down_2",
			"frame": { "x": 768, "y": 0, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 55, "y": -55, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_rider_down_1",
			"frame": { "x": 768, "y": 128, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 55, "y": -55, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_rider_down_0",
			"frame": { "x": 768, "y": 1024, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 55, "y": -25, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},		
		{
			"filename": "rebel_rider_up_2",
			"frame": { "x": 768, "y": 256, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 55, "y": -55, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_rider_up_1",
			"frame": { "x": 768, "y": 384, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 55, "y": -55, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_rider_up_0",
			"frame": { "x": 768, "y": 1024, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 55, "y": -25, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_rider_left_2",
			"frame": { "x": 768, "y": 512, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 55, "y": -55, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_rider_left_1",
			"frame": { "x": 768, "y": 640, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 55, "y": -55, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_rider_left_0",
			"frame": { "x": 768, "y": 1024, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 55, "y": -25, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_rider_right_2",
			"frame": { "x": 768, "y": 768, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 55, "y": -55, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_rider_right_1",
			"frame": { "x": 768, "y": 896, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 55, "y": -55, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_rider_right_0",
			"frame": { "x": 768, "y": 1024, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 55, "y": -25, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},		
		
//==================================== at-st		
		{
			"filename": "empire_rider_down_2",
			"frame": { "x": 896, "y": 0, "w": 128, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": -100, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_rider_down_1",
			"frame": { "x": 896, "y": 192, "w": 128, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": -100, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_rider_down_0",
			"frame": { "x": 896, "y": 1536, "w": 128, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": 0, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},		
		{
			"filename": "empire_rider_up_2",
			"frame": { "x": 896, "y": 384, "w": 128, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": -100, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_rider_up_1",
			"frame": { "x": 896, "y": 576, "w": 128, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": -100, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_rider_up_0",
			"frame": { "x": 896, "y": 1536, "w": 128, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": 0, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_rider_left_2",
			"frame": { "x": 896, "y": 768, "w": 128, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": -100, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_rider_left_1",
			"frame": { "x": 896, "y": 960, "w": 128, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": -100, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_rider_left_0",
			"frame": { "x": 896, "y": 1536, "w": 128, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": 0, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_rider_right_2",
			"frame": { "x": 896, "y": 1152, "w": 128, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": -100, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_rider_right_1",
			"frame": { "x": 896, "y": 1344, "w": 128, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": -100, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_rider_right_0",
			"frame": { "x": 896, "y": 1536, "w": 128, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 50, "y": 0, "w": 256, "h": 256 },
			"sourceSize": { "w": 256, "h": 256 }
		},	
//=========== extra minifigs ============================================================			
		{  
			"filename": "empire_rider_minifig",
			"frame": { "x": 896, "y": 1728, "w": 128, "h": 192 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_rider_minifig",
			"frame": { "x": 768, "y": 1152, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 64, "y": -30, "w": 128, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
//=========================================================================================		
		{
			"filename": "blankTile",
			"frame": { "x": 0, "y": 128, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "rebel_shooter",
			"frame": { "x": 0, "y": 3200, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "empire_shooter",
			"frame": { "x": 256, "y": 3200, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "shootable_on",
			"frame": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "shootable_on_over",
			"frame": { "x": 0, "y": 128, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
			"filename": "shootable_off",
			"frame": { "x": 256, "y": 0, "w": 256, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
			"sourceSize": { "w": 256, "h": 256 }
		},
		{
		 	"filename": "moveable_right",
		 	"frame": { "x": 0, "y": 512, "w": 256, "h": 128 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
		 	"sourceSize": { "w": 256, "h": 256 }
		 },
		 {
		 	"filename": "moveable_left",
		 	"frame": { "x": 0, "y": 640, "w": 256, "h": 128 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
		 	"sourceSize": { "w": 256, "h": 256 }
		 },
		  {
		  	"filename": "moveable_up",
		  	"frame": { "x": 0, "y": 768, "w": 256, "h": 128 },
		  	"rotated": false,
		  	"trimmed": true,
		  	"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
		  	"sourceSize": { "w": 256, "h": 256 }
		  },
		 {
		 	"filename": "moveable_down",
		 	"frame": { "x": 0, "y": 896, "w": 256, "h": 128 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 128 },
		 	"sourceSize": { "w": 256, "h": 256 }
		 },
		 {
		 	"filename": "shoot_left",
		 	"frame": { "x": 0, "y": 1024, "w": 64, "h": 64 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 64, "h": 64 },
		 	"sourceSize": { "w": 64, "h": 64 }
		 },
		 {
		 	"filename": "shoot_up",
		 	"frame": { "x": 64, "y": 1024, "w": 64, "h": 64 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 64, "h": 64 },
		 	"sourceSize": { "w": 64, "h": 64 }
		 },
		 {
		 	"filename": "shoot_down",
		 	"frame": { "x": 128, "y": 1024, "w": 64, "h": 64 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 64, "h": 64 },
		 	"sourceSize": { "w": 64, "h": 64 }
		 },
		 {
		 	"filename": "shoot_right",
		 	"frame": { "x": 192, "y": 1024, "w": 64, "h": 64 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 64, "h": 64 },
		 	"sourceSize": { "w": 64, "h": 64 }
		 },
		 {
		 	"filename": "shoot_left_rider",
		 	"frame": { "x": 128, "y": 1088, "w": 64, "h": 64 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 64, "h": 64 },
		 	"sourceSize": { "w": 64, "h": 64 }
		 },
		 {
		 	"filename": "shoot_up_rider",
		 	"frame": { "x": 0, "y": 1088, "w": 64, "h": 64 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 64, "h": 64 },
		 	"sourceSize": { "w": 64, "h": 64 }
		 },
		 {
		 	"filename": "shoot_down_rider",
		 	"frame": { "x": 192, "y": 1088, "w": 64, "h": 64 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 64, "h": 64 },
		 	"sourceSize": { "w": 64, "h": 64 }
		 },
		 {
		 	"filename": "shoot_right_rider",
		 	"frame": { "x": 64, "y": 1088, "w": 64, "h": 64 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 64, "h": 64 },
		 	"sourceSize": { "w": 64, "h": 64 }
		 },
		 
//============================= instruction manual images =====================================================		 
		 {
		 	"filename": "empire_vehicle",
		 	"frame": { "x": 512, "y": 2048, "w": 192, "h": 192 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 192, "h": 192 },
		 	"sourceSize": { "w": 192, "h": 192 }
		 },
		 {
		 	"filename": "empire_cannon",
		 	"frame": { "x": 512, "y": 2240, "w": 192, "h": 192 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 192, "h": 192 },
		 	"sourceSize": { "w": 192, "h": 192 }
		 },
		 {
		 	"filename": "empire_army",
		 	"frame": { "x": 512, "y": 2432, "w": 192, "h": 192 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 192, "h": 192 },
		 	"sourceSize": { "w": 192, "h": 192 }
		 },
		 {
		 	"filename": "empire_hero_army",
		 	"frame": { "x": 512, "y": 2624, "w": 192, "h": 192 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 192, "h": 192 },
		 	"sourceSize": { "w": 192, "h": 192 }
		 },
		 {
		 	"filename": "empire_rider",
		 	"frame": { "x": 512, "y": 2816, "w": 192, "h": 192 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 192, "h": 192 },
		 	"sourceSize": { "w": 192, "h": 192 }
		 },
		 {
		 	"filename": "rebel_vehicle",
		 	"frame": { "x": 704, "y": 2048, "w": 192, "h": 192 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 192, "h": 192 },
		 	"sourceSize": { "w": 192, "h": 192 }
		 },
		 {
		 	"filename": "rebel_cannon",
		 	"frame": { "x": 704, "y": 2240, "w": 192, "h": 192 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 192, "h": 192 },
		 	"sourceSize": { "w": 192, "h": 192 }
		 },
		 {
		 	"filename": "rebel_army",
		 	"frame": { "x": 704, "y": 2432, "w": 192, "h": 192 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 192, "h": 192 },
		 	"sourceSize": { "w": 192, "h": 192 }
		 },
		 {
		 	"filename": "rebel_hero_army",
		 	"frame": { "x": 704, "y": 2624, "w": 192, "h": 192 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 192, "h": 192 },
		 	"sourceSize": { "w": 192, "h": 192 }
		 },
		 {
		 	"filename": "rebel_rider",
		 	"frame": { "x": 704, "y": 2816, "w": 192, "h": 192 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 192, "h": 192 },
		 	"sourceSize": { "w": 192, "h": 192 }
		 },	
//============================= target ranges =====================================================		 		 
		 {
		 	"filename": "three_linear",
		 	"frame": { "x": 768, "y": 1280, "w": 128, "h": 128 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
		 	"sourceSize": { "w": 128, "h": 128 }
		 },	
		 {
		 	"filename": "two_linear",
		 	"frame": { "x": 768, "y": 1408, "w": 128, "h": 128 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
		 	"sourceSize": { "w": 128, "h": 128 }
		 },	
		 {
		 	"filename": "one_linear",
		 	"frame": { "x": 768, "y": 1536, "w": 128, "h": 128 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
		 	"sourceSize": { "w": 128, "h": 128 }
		 },	
		 {
		 	"filename": "two_diaganol",
		 	"frame": { "x": 768, "y": 1664, "w": 128, "h": 128 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
		 	"sourceSize": { "w": 128, "h": 128 }
		 },	
		 {
		 	"filename": "health_heart",
		 	"frame": { "x": 768, "y": 1792, "w": 64, "h": 64 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 64, "h": 64 },
		 	"sourceSize": { "w": 64, "h": 64 }
		 },
		 {
		 	"filename": "empty_health_heart",
		 	"frame": { "x": 768, "y": 1856, "w": 64, "h": 64 },
		 	"rotated": false,
		 	"trimmed": true,
		 	"spriteSourceSize": { "x": 0, "y": 0, "w": 64, "h": 64 },
		 	"sourceSize": { "w": 64, "h": 64 }
		 },

		 {
			"filename": "control_panel",
			"frame": { "x": 896, "y": 1920, "w": 128, "h": 128 },
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
			"sourceSize": { "w": 128, "h": 128 }
		 },
	]
}