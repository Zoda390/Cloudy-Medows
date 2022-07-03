/*
@authors: Whole
@brief: Outputs to canvas
*/

/*
Matrix/Tile Key:

1 = grass
2 = plot
3 = corn
4 = wall
5 = concrete1
5 = dirt
7 = bed
8 = cart_s
9 = corn cart
10 = bridge
11 = junk
12 = concrete2
13 = satilite
14 = solar panel
15 = compost bucket
16 = compost
17 = sweet potato
18 = sprinkler
19 = lampost
20 = strawberry
21 = flower
22 = deb
23 = cowboy rick
24 = ladybug
25 = bee
26 = meb
27 = cart b corn
28 = cart b lady
29 = cart b sp
30 = cart b sprinkler
31 = cart b straw
32 = bridge2
33 = mario
34 = garry
35 = mira
36 = old man j
37 = brandon
38 = brent
39 = blind pete
40 = james

*/

//main stuff starts here

var cloudCount = 8;
var clouds = [];
var tileSize = 32;
var canvasWidth = 23 * tileSize;
var canvasHeight = 19 * tileSize;
var player;
var levels = [];
var currentLevel_y = 1;
var currentLevel_x = 1;
var lastMili = 0;
var maxHunger = 6;
var time = 0;
var timephase = 0;
var lastTimeMili = 0;
var lastHungerMili = 0;
var days = 0;
var title_screen = true;
var all_tiles = [];
var all_items = [];

function preload() {
    //Items

    corn_img = loadImage('images/items/Corn_item.png');
    corn_seed_bag_img = loadImage('images/items/Corn_Seed_bag.png');
    sweet_potato_seed_bag_img = loadImage('images/items/seedbag_sp.png');
    sweet_potato_img = loadImage('images/items/SweetPotato.png');

    straw_img = loadImage('images/items/Stawberry.png');
    strawberry_seed_bag_img = loadImage('images/items/SeedBag_Stawberry.png');

    hoe_img = loadImage('images/items/Hoe.png');
    junk_img = loadImage('images/items/junk.png');
    compost_img = loadImage('images/items/Compost.png');
    sprinkler_img = loadImage('images/items/Sprinkler.png');

    //Tile                                                  Tile Num.
    grass_tile_img = loadImage('images/tiles/Grass.png');                //1
    plot_tile_img = loadImage('images/tiles/Plot.png');                  //2
    wall_tile_img = loadImage('images/tiles/Wood.png');                  //4
    concrete_tile_img = loadImage('images/tiles/Concrete_1.png');        //5
    dirt_tile_img = loadImage('images/tiles/dirt.png');                  //6
    bed_tile_img = loadImage('images/tiles/Bed.png');                    //7
    cart_s_tile_img = loadImage('images/tiles/Cart_s.png');              //8
    cart_tile_img = loadImage('images/tiles/Cart.png');                  //9
    bridge_tile_img = loadImage('images/tiles/Bridge.png');              //10
    junk_tile_img = loadImage('images/tiles/junk_tile.png');             //11
    concrete_tile_2_img = loadImage('images/tiles/Concrete2.png');       //12
    satilite_tile_img = loadImage('images/tiles/Satilite.png');          //13
    solarpanel_tile_img = loadImage('images/tiles/SolarPanel.png');      //14
    compost_bucket_tile_img = loadImage('images/tiles/Worm_Bucket.png'); //15
    compost_tile_img = loadImage('images/tiles/Compost_tile.png');       //16
    sprinkler_tile_img = loadImage('images/tiles/Sprinkler.gif');        //18
    lamppost_tile_img = loadImage('images/tiles/Light.png');             //19
    deb_tile_img = loadImage('images/npc/Deb.gif');                    //22
    rick_tile_img = loadImage('images/npc/CowBoy_Rick.gif');           //23
    meb_tile_img = loadImage('images/npc/meb.png');                    //26
    cart_sp_tile_img = loadImage('images/tiles/sp_cart.png');
    cart_straw_tile_img = loadImage('images/tiles/StrawCart.png');
    cart_flower_tile_img = loadImage('images/tiles/flowerShop.png');
    cart_ladybug_tile_img = loadImage('images/tiles/ladybug_cart.png');
    cart_sprinkler_tile_img = loadImage('images/tiles/sprinkler_cart.png');
    bridge_tile_2_img = loadImage('images/tiles/BridgeFlip.png');
    old_man_j_tile_img = loadImage('images/npc/old_man_Jay.gif');
    mira_tile_img = loadImage('images/npc/Mira.png');
    mario_tile_img = loadImage('images/npc/Mario.png');
    liam_tile_img = loadImage('images/npc/liam.png');
    garry_tile_img = loadImage('images/npc/Garry.png');
    blind_pette_tile_img = loadImage('images/npc/Blind_pete.png');
    brandon_tile_img = loadImage('images/npc/Brandon.png');
    james_tile_img = loadImage('images/npc/james.png');
    brent_tile_img = loadImage('images/npc/Brent.png');

    //Ui
    player_2 = loadFont('pixelFont.ttf');
    inv_img = loadImage('images/ui/Inventory.png');
    inv_hand_img = loadImage('images/ui/Inventory_Frame.png');
    hunger_e = loadImage('images/ui/Corn_empty.png');
    hunger_f = loadImage('images/ui/Corn_Filled.png');
    calendar_img = loadImage('images/ui/Calender.png');
    coin_img = loadImage('images/ui/coin.png');
    title_screen_img = loadImage('images/ui/Title_Screen.gif');
    button_img = loadImage('images/ui/Button.png');
    button_selected_img = loadImage('images/ui/ButtonSelected.png');

    //Player
    up_move_img_1 = loadImage('images/player/Back_Move.png');
    up_move_img_2 = loadImage('images/player/BackMove_2.png');
    down_move_img_1 = loadImage('images/player/Front_moving.png');
    down_move_img_2 = loadImage('images/player/front_Move2.png');
    left_move_img_1 = loadImage('images/player/Side_Move.png');
    left_move_img_2 = loadImage('images/player/SideMove2.png');
    right_move_img_1 = loadImage('images/player/Right_Move.png');
    right_move_img_2 = loadImage('images/player/RightMove2.png');
    player_imgs = [[up_move_img_1, up_move_img_2],
    [right_move_img_1, right_move_img_2],
    [down_move_img_1, down_move_img_2],
    [left_move_img_1, left_move_img_2]
    ];

    //Plants
    done_dot = loadImage('images/ui/plant_done_icon.png');
    //  Corn 3
    corn_tile_img = loadImage('images/tiles/CornStage_1.png');
    corn_tile_2_img = loadImage('images/tiles/CornStage_2.png');
    corn_tile_3_img = loadImage('images/tiles/CornStage_4.png');
    corn_tile_4_img = loadImage('images/tiles/CornStage5.png');
    corn_tile_5_img = loadImage('images/tiles/CornStage6_1.png');
    corn_tile_6_img = loadImage('images/tiles/Cornstage7.png');
    corn_tile_7_img = loadImage('images/tiles/CornStage8.png');
    corn_tile_8_img = loadImage('images/tiles/CornDead.png');
    corn_tile_imgs = [corn_tile_img, corn_tile_2_img, corn_tile_3_img, corn_tile_4_img, corn_tile_5_img, corn_tile_6_img, corn_tile_7_img, corn_tile_8_img];
    //  Sweet Potato 17
    sweet_potato_tile_img = loadImage('images/tiles/beets_1.png');
    sweet_potato_tile_2_img = loadImage('images/tiles/beets_2.png');
    sweet_potato_tile_3_img = loadImage('images/tiles/beets_3.png');
    sweet_potato_tile_4_img = loadImage('images/tiles/beets_4.png');
    sweet_potato_tile_5_img = loadImage('images/tiles/beets_5.png');
    sweet_potato_tile_imgs = [sweet_potato_tile_img, sweet_potato_tile_2_img, sweet_potato_tile_3_img, sweet_potato_tile_4_img, sweet_potato_tile_5_img];

    //Strawberry 20
    strawberry_tile_img = loadImage('images/tiles/strawberry_1.png');
    strawberry_tile_2_img = loadImage('images/tiles/strawberry_2.png');
    strawberry_tile_3_img = loadImage('images/tiles/strawberry_3.png');
    strawberry_tile_4_img = loadImage('images/tiles/strawberry_4.png');
    strawberry_tile_5_img = loadImage('images/tiles/strawberry_5.png');
    strawberry_tile_6_img = loadImage('images/tiles/strawberry_6.png');
    strawberry_tile_imgs = [strawberry_tile_img, strawberry_tile_2_img, strawberry_tile_3_img, strawberry_tile_4_img, strawberry_tile_5_img, strawberry_tile_6_img];
    //flower  21
    flower_bag_img = loadImage("images/items/SeedBagFlower.png");
    flower_tile_img = loadImage("images/tiles/FlowerStage_1.png");
    flower_tile_img2 = loadImage("images/tiles/FlowerStage_2.png");
    flower_tile_imgs = [flower_tile_img, flower_tile_img2, flower_tile_img2];

    // ladybugs
    ladybug_bag_img = loadImage("images/items/Lady_Bug_bag.png");
    ladybug_img = loadImage("images/tiles/LadyBugs.gif");

    //bees
    bee_img = loadImage("images/tiles/Bees.gif");

    //sounds
    hoe_sound = new Sound('audio/Hoe.wav');
    onDeathSound = new Sound('audio/Death.wav');
    newDayChime = new Sound('audio/NewDay.mp3');
    main_theme = new Sound('audio/Main_theme.mp3');
    main_theme_old = new Sound('audio/Main_theme.wav');
    empty_burst = new Sound('audio/empty_burst.mp3');
    calm_dings = new Sound('audio/calm_dings.mp3');
    hit_sound = new Sound('audio/hit2.wav');
    moneySound = new Sound('audio/money.wav');

    background_img = loadImage('images/Skyline.gif');
    foreground_img = loadImage('images/Fore6.png');

    main_theme.play(); //needs to loop

    /*
    class           obj
    Tile            { name: 'name', png: png_img, border: true, collide: false, age: -1, class: 'Tile' }
    Plant           { name: 'name', png: png_img, border: true, collide: false, age: 0, seed_num: 0, waterneed: 0, growthTime: 0, class: 'Plant' }
    Entity          { name: 'name', png: png_img, border: true, collide: false, age: -1, inv: [], hand: 0, under_tile_num: 0, class: 'Entity' }
    FreeMoveEntity  { name: 'name', png: png_img, border: true, collide: false, age: -1, class: 'FreeMoveEntity' }
    MoveableEntity  { name: 'name', png: png_img, inv: [], hand: 0, facing: 3, under_tile_num: 0, moving_timer: 0, class: 'MoveableEntity' }
    GridMoveEntity  { name: 'name', png: png_img, inv: [], hand: 0, facing: 3, under_tile_num: 0, instructions: [], moving_timer: 0, class: 'GridMoveEntity' }
    NPC             { name: 'name', png: png_img, inv: [], hand: 0, facing: 3, under_tile_num: 0, instructions: [], moving_timer: 0, class: 'NPC' }
    */
    new GridMoveEntity()
    all_tiles = [
    /*1*/    { name: 'grass', png: grass_tile_img, border: true, collide: false, age: -1, class: 'Tile' },
    /*2*/    { name: 'plot', png: plot_tile_img, border: true, collide: false, age: 0, class: 'Tile' },
    /*3*/    { name: 'corn', png: corn_tile_imgs, border: true, collide: false, age: 0, eat_num: 2, waterneed: 0, growthTime: 100, class: 'Plant' },
    /*4*/    { name: 'wall', png: wall_tile_img, border: true, collide: true, age: -1, class: 'Tile' },
    /*5*/    { name: 'concrete', png: concrete_tile_img, border: true, collide: false, age: -1, class: 'Tile' },
    /*6*/    { name: 'dirt', png: dirt_tile_img, border: true, collide: false, age: 0, class: 'Tile' },
    /*7*/    { name: 'bed', png: bed_tile_img, border: true, collide: false, age: -1, class: 'Tile' },
    /*8*/    { name: 'cart_s', png: cart_s_tile_img, border: true, collide: false, age: -1, class: 'Tile' },
    /*9*/    { name: 'cart_b_corn', png: cart_tile_img, border: true, collide: false, age: -1, class: 'Tile' },
    /*10*/    { name: 'bridge', png: bridge_tile_img, border: false, collide: false, age: -1, class: 'Tile' },
    /*11*/    { name: 'junk', png: junk_tile_img, border: true, collide: false, age: -1, class: 'Tile' },
    /*12*/    { name: 'concrete2', png: concrete_tile_2_img, border: true, collide: false, age: -1, class: 'Tile' },
    /*13*/    { name: 'satilite', png: satilite_tile_img, border: true, collide: true, age: -1, class: 'Tile' },
    /*14*/    { name: 'solarpanel', png: solarpanel_tile_img, border: true, collide: true, age: -1, class: 'Tile' },
    /*15*/    { name: 'compost_bucket', png: compost_bucket_tile_img, border: true, collide: true, age: -1, class: 'Tile' },
    /*16*/    { name: 'compost_tile', png: compost_tile_img, border: true, collide: false, age: 0, class: 'Tile' },
    /*17*/    { name: 'sweet_potato', png: sweet_potato_tile_imgs, border: true, collide: false, age: 0, eat_num: 5, waterneed: 0, growthTime: 100, class: 'Plant' },
    /*18*/    { name: 'sprinkler', png: sprinkler_tile_img, border: true, collide: false, age: -1, class: 'Tile' },
    /*19*/    { name: 'lamppost', png: lamppost_tile_img, border: true, collide: true, age: -1, class: 'Tile' },
    /*20*/    { name: 'strawberry', png: strawberry_tile_imgs, border: true, collide: false, age: 0, eat_num: 7, waterneed: 0, growthTime: 100, class: 'Plant' },
    /*21*/    { name: 'flower', png: flower_tile_imgs, border: true, collide: false, age: 0, eat_num: 0, waterneed: 0, growthTime: 100, class: 'Plant' },
    /*22*/    { name: 'deb', png: deb_tile_img, inv: [], hand: 0, facing: 3, under_tile_num: 5, instructions: [], moving_timer: 0, class: 'NPC' },
    /*23*/    { name: 'rick', png: rick_tile_img, inv: [], hand: 0, facing: 3, under_tile_num: 5, instructions: [], moving_timer: 0, class: 'NPC' },
    /*24*/    { name: 'ladybug', png: ladybug_img, border: true, collide: false, age: -1, class: 'Entity' },
    /*25*/    { name: 'bee', png: bee_img, border: true, collide: true, age: -1, class: 'FreeMoveEntity' },
    /*26*/    { name: 'meb', png: meb_tile_img, inv: [], hand: 0, facing: 3, under_tile_num: 5, instructions: [], moving_timer: 0, class: 'NPC' },
    /*27*/    { name: 'cart_b_sp', png: cart_sp_tile_img, border: true, collide: false, age: -1, class: 'Tile' },
    /*28*/    { name: 'cart_b_straw', png: cart_straw_tile_img, border: true, collide: false, age: -1, class: 'Tile' },
    /*29*/    { name: 'cart_b_flower', png: cart_flower_tile_img, border: true, collide: false, age: -1, class: 'Tile' },
    /*30*/    { name: 'cart_b_lady', png: cart_ladybug_tile_img, border: true, collide: false, age: -1, class: 'Tile' },
    /*31*/    { name: 'cart_b_sprinkler', png: cart_sprinkler_tile_img, border: true, collide: false, age: -1, class: 'Tile' },
    /*32*/    { name: 'bridge2', png: bridge_tile_2_img, border: true, collide: false, age: -1, class: 'Tile' },
    /*33*/    { name: 'mario', png: mario_tile_img, inv: [], hand: 0, facing: 3, under_tile_num: 5, instructions: [], moving_timer: 100, class: 'NPC' },
    /*34*/    { name: 'garry', png: garry_tile_img, inv: [], hand: 0, facing: 3, under_tile_num: 5, instructions: [], moving_timer: 100, class: 'NPC' },
    /*35*/    { name: 'mira', png: mira_tile_img, inv: [], hand: 0, facing: 3, under_tile_num: 5, instructions: [], moving_timer: 100, class: 'NPC' },
    /*36*/    { name: 'oldManJ', png: old_man_j_tile_img, inv: [], hand: 0, facing: 3, under_tile_num: 5, instructions: [], moving_timer: 100, class: 'NPC' },
    /*37*/    { name: 'flower', png: flower_tile_imgs, border: true, collide: false, age: 0, eat_num: 0, waterneed: 0, growthTime: 100, class: 'Plant' }
    ];
    /*
    class       obj
    Item        {name: 'name', png: png_img, price: 0, class: 'Item'}
    Tool        {name: 'name', png: png_img, class: 'Tool'}
    Eat         {name: 'name', png: png_img, price: 0, hunger: 0, hunger_timer: 0, seed_num: 0, class: 'Eat'}
    Seed        {name: 'name', png: png_img, plant_num: 0, class: 'Seed'}
    Placable    {name: 'name', png: png_img, tile_num: 0, class: 'Placeable'}
    */
    all_items = [
        /*0*/ 0,
        /*1*/ { name: 'Hoe', png: hoe_img, class: 'Tool' },
        /*2*/ { name: 'Corn', png: corn_img, price: 4, hunger: 2, hunger_timer: 100, seed_num: 3, class: 'Eat' },
        /*3*/ { name: 'Corn Seed', png: corn_seed_bag_img, plant_num: 3, class: 'Seed' },
        /*4*/ { name: 'Junk', png: junk_img, price: 0, class: 'Item' },
        /*5*/ { name: 'Sweet Potato', png: sweet_potato_img, price: 3, hunger: 1, hunger_timer: 100, seed_num: 6, class: 'Eat' },
        /*6*/ { name: 'Sweet Potato Seed', png: sweet_potato_seed_bag_img, plant_num: 17, class: 'Seed' },
        /*7*/ { name: 'Strawberry', png: straw_img, price: 2, hunger: 1, hunger_timer: 50, seed_num: 8, class: 'Eat' },
        /*8*/ { name: 'Strawberry Seed', png: strawberry_seed_bag_img, plant_num: 20, class: 'Seed' }
    ];
}

/*

27 = cart b corn
28 = cart b lady
29 = cart b sp
30 = cart b sprinkler
31 = cart b straw
32 = bridge2
33 = mario
34 = garry
35 = mira
36 = old man j
37 = brandon
38 = brent
39 = blind pete
40 = james
*/






function setup() {
    createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i < cloudCount; i++) {
        clouds[i] = new Cloud()
    }
    player = new Player('player1', player_imgs, (5 * tileSize), (5 * tileSize));
    //Home
    /*
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [10, 10, 5, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 13, 5, 0, 0, 0],
        [0, 0, 5, 4, 7, 5, 4, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 4, 5, 5, 4, 5, 5, 12, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 4, 4, 5, 4, 19, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 12, 5, 10, 10, 10],
        [0, 0, 5, 5, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 5, 12, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 14, 14, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 19, 14, 14, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
    */
    level1 = new Level([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [10, 10, 5, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 13, 5, 0, 0, 0],
        [0, 0, 5, 4, 7, 5, 4, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 4, 5, 5, 4, 5, 5, 12, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 4, 4, 5, 4, 19, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 12, 5, 10, 10, 10],
        [0, 0, 5, 5, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 5, 12, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 14, 14, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 19, 14, 14, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
    ]
    );
    //Compost
    level2 = new Level
        ([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 13, 5, 12, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 19, 5, 5, 5, 5, 5, 26, 15, 22, 5, 5, 5, 5, 5, 5, 19, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 6, 6, 6, 6, 6, 6, 12, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 12, 5, 5, 5, 36, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [10, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 12, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 12, 5, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 19, 12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 19, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
        ]
        );
    //Strawberry farm
    level3 = new Level([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 19, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 19, 0, 0, 0],
        [0, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 10, 10, 10],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 23, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 19, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0, 0, 0],
        [0, 0, 19, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 19, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
    ]
    );
    //village
    level4 = new Level([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 19, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 19, 0, 0, 0],
        [0, 0, 5, 4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 5, 0, 0, 0],
        [0, 0, 5, 4, 7, 34, 4, 5, 5, 4, 7, 5, 4, 5, 5, 4, 7, 5, 4, 5, 0, 0, 0],
        [0, 0, 5, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 4, 5, 4, 5, 0, 0, 0],
        [0, 0, 5, 4, 4, 5, 4, 5, 19, 4, 4, 5, 4, 19, 5, 5, 4, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 4, 4, 0, 0, 0],
        [10, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 4, 0, 0, 0],
        [0, 0, 5, 5, 5, 4, 5, 4, 4, 5, 5, 5, 5, 5, 5, 5, 4, 7, 5, 4, 0, 0, 0],
        [0, 0, 5, 5, 5, 4, 5, 5, 4, 5, 5, 5, 5, 5, 19, 5, 4, 4, 4, 4, 0, 0, 0],
        [0, 0, 5, 5, 5, 4, 7, 5, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 19, 5, 5, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 19, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
    ]
    );
    //abandened plot
    level5 = new Level([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 5, 5, 19, 6, 6, 6, 6, 11, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 11, 6, 6, 6, 6, 10, 10, 10, 10],
        [0, 5, 5, 19, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 11, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
    ]
    );
    //market
    level6 = new Level([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 19, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 5, 5, 5, 5, 38, 5, 5, 5, 28, 5, 40, 5, 5, 5, 0, 0, 0, 0, 0],
        [0, 0, 0, 5, 5, 19, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [10, 10, 5, 5, 5, 5, 5, 29, 5, 5, 5, 5, 35, 5, 5, 5, 19, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 37, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 30, 5, 5, 5, 5, 5, 5, 5, 27, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 31, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 0, 5, 19, 5, 5, 5, 5, 5, 5, 19, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0],
        [0, 0, 0, 0, 5, 5, 5, 5, 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 8, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
    ]
    );
    //Blind pete
    level7 = new Level([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 5, 0, 32, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 5, 5, 32, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 13, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 6, 6, 6, 6, 6, 6, 12, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 12, 5, 19, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 6, 6, 6, 6, 6, 5, 5, 5, 6, 6, 6, 6, 6, 6, 5, 12, 0, 0, 0],
        [0, 0, 5, 5, 6, 6, 6, 6, 6, 5, 12, 5, 6, 6, 6, 6, 6, 6, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 6, 6, 6, 6, 6, 5, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 0, 0, 0],
        [0, 0, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 19, 5, 5, 12, 5, 5, 5, 5, 10, 10, 10],
        [0, 0, 0, 0, 0, 0, 0, 5, 12, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
    ]
    );
    //many bridge
    level8 = new Level([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 19, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 1, 1, 1, 5, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 19, 0, 0],
        [10, 10, 5, 1, 1, 1, 5, 0, 0, 0, 0, 0, 0, 5, 1, 1, 1, 1, 1, 1, 5, 0, 0],
        [0, 0, 5, 1, 1, 1, 5, 10, 10, 10, 10, 10, 10, 5, 1, 1, 1, 1, 1, 1, 5, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 0, 0, 32, 0, 0, 0, 5, 1, 1, 1, 1, 1, 1, 5, 0, 0],
        [0, 0, 0, 32, 0, 0, 0, 0, 0, 32, 0, 0, 0, 5, 1, 1, 1, 1, 1, 1, 5, 0, 0],
        [0, 0, 0, 32, 0, 0, 0, 0, 0, 32, 0, 0, 0, 5, 1, 1, 1, 1, 1, 1, 5, 0, 0],
        [0, 0, 0, 32, 0, 0, 5, 5, 5, 5, 5, 0, 0, 5, 1, 1, 1, 1, 1, 1, 5, 0, 0],
        [0, 0, 0, 32, 0, 0, 5, 1, 1, 1, 5, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0],
        [0, 0, 0, 32, 0, 0, 19, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0],
        [0, 0, 0, 32, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0],
        [10, 10, 10, 1, 10, 5, 5, 5, 10, 10, 5, 5, 5, 5, 5, 33, 0, 0, 0, 32, 0, 0, 0],
        [0, 0, 0, 0, 0, 5, 1, 5, 0, 0, 5, 1, 1, 1, 1, 5, 10, 10, 10, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]
    ]
    );
    //big green plot
    level9 = new Level([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 19, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 19, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 6, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 19, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 19, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
    ]
    );
    levels = [[level5, level4, level6],
    [level3, level1, level2],
    [level7, level8, level9]
    ];
}

function draw() {
    takeInput();
    if (title_screen) {
        background(135, 206, 235);
        push()
        for (let i = 0; i < clouds.length; i++) {
            clouds[i].update(clouds[i].vel)
            clouds[i].render()
        }
        imageMode(CENTER);
        image(title_screen_img, canvasWidth / 2, (canvasHeight / 2) - 40);

        textFont(player_2);
        fill('black');
        textAlign(CENTER, CENTER);
        textSize(13);
        text('Press E to start.', canvasWidth / 2, (canvasHeight * 4) / 5);

        pop();
    }
    else {
        background(135, 206, 235);
        image(background_img, 0, 0);
        levels[currentLevel_y][currentLevel_x].fore_render();
        levels[currentLevel_y][currentLevel_x].render();
        for (let y = 0; y < levels.length; y++) {
            for (let x = 0; x < levels[y].length; x++) {
                if (levels[y][x] != 0) {
                    levels[y][x].update(x, y);
                }
            }
        }
        player.render();
        background(0, 0, 0, time);
        render_ui();
        if (millis() - lastTimeMili > 150) { //150 for normal time
            if (timephase == 0) {
                if (player.touching.name == 'bed') {
                    time += 5;
                }
                else {
                    time += 1;
                }
            }
            if (timephase == 1) {
                if (player.touching.name == 'bed') {
                    time -= 5;
                }
                else {
                    time -= 1;
                }
            }
            if (time >= 200) {
                timephase = 1;
                days += 1;
                newDayChime.play();
            }
            if (time <= 0) {
                timephase = 0;
                for (let y = 0; y < levels.length; y++) {
                    for (let x = 0; x < levels[y].length; x++) {
                        if (levels[y][x] != 0) {
                            levels[y][x].daily_update();
                        }
                    }
                }
            }
        }
        lastTimeMili = millis();
    }
}


function addItem(item_obj_num, amount) {
    for (let i = 0; i < 8; i++) {
        if (player.inv[i] != 0) {
            if (player.inv[i].name == all_items[item_obj_num].name) {
                player.inv[i].amount += amount;
                return;
            }
        }
    }
    if (player.inv[player.hand] == 0) {
        player.inv[player.hand] = new_item_from_num(item_obj_num, amount);
        return;
    }

    for (let i = 0; i < 8; i++) {
        if (player.inv[i] == 0) {
            player.inv[i] = new_item_from_num(item_obj_num, amount);
            return;
        }
    }
}



//keys
var move_right_button = 68;//d
var move_left_button = 65; //a
var move_up_button = 87;   //w
var move_down_button = 83; //s
var interact_button = 69;  //e
var eat_button = 81;       //q
function takeInput() {
    if (title_screen) {
        if (keyIsDown(interact_button)) {
            title_screen = false;
        }
    }
    else {
        //basic movement  
        player.move();
        if (keyIsDown(eat_button)) {
            player.eat();
        }
        if (keyIsDown(interact_button)) {
            player.interactCall();
        }
        /*
        if(keyIsDown(48)){
          player.hand = 9;
        }
        */
        //mc style hotbar
        if (keyIsDown(49)) {
            player.hand = 0;
        }
        if (keyIsDown(50)) {
            player.hand = 1;
        }
        if (keyIsDown(51)) {
            player.hand = 2;
        }
        if (keyIsDown(52)) {
            player.hand = 3;
        }
        if (keyIsDown(53)) {
            player.hand = 4;
        }
        if (keyIsDown(54)) {
            player.hand = 5;
        }
        if (keyIsDown(55)) {
            player.hand = 6;
        }
        if (keyIsDown(56)) {
            player.hand = 7;
        }

        /*
        if(keyIsDown(57)){
          player.hand = 8;
        }
        */
        if (keyIsDown(80)) { //p
            if (millis() - lastMili > 100) {
                console.log(player);
                console.log(player.touching);
                lastMili = millis();
            }
        }
    }
}

//Christian's function to make UI more readible, positioning + math stuff
function render_ui() {
    image(inv_img, (canvasWidth / 2) - (512 / 2), canvasHeight - 64);
    image(inv_hand_img, (canvasWidth / 2) - (512 / 2) + (64 * player.hand), canvasHeight - 64);
    image(calendar_img, canvasWidth - 70, 6);

    //calendar text
    textFont(player_2);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(13);
    text('days', canvasWidth - 39, 30);
    textSize(15);
    text(days, canvasWidth - 40, 50);

    for (let i = 0; i < 8; i++) {
        if (player.inv[i] == undefined) {
            player.inv[i] = 0;
        }
        if (player.inv[i] != 0) {
            player.inv[i].render(i);
            if (i == player.hand) {
                push();
                fill(255)
                textSize(13);
                textAlign(CENTER, CENTER);
                text(player.inv[i].name, (9 * canvasWidth / 16), (canvasHeight - 80));
                pop()
            }
        }
    }
    for (let i = 0; i < maxHunger; i++) {
        image(hunger_e, (canvasWidth / 2) - (512 / 2) + (30 * i), (canvasHeight - 100));
    }
    for (let i = 0; i < player.hunger; i++) {
        image(hunger_f, (canvasWidth / 2) - (512 / 2) + (30 * i), (canvasHeight - 100));
    }
    textSize(32.5);
    fill(0);
    textAlign(LEFT, TOP);
    image(coin_img, (canvasWidth / 2) + (512 / 2) - 100, (canvasHeight - 95));
    text(player.coins, (canvasWidth / 2) + (512 / 2) - 64, (canvasHeight - 92.5));

    //draw line for clock, happens 1/12
    if (player.looking(currentLevel_x, currentLevel_y) != undefined && player.facing == 0) {
        if (player.looking(currentLevel_x, currentLevel_y).age == -2) {
            push()
            stroke(0);
            fill(255);
            rectMode(CENTER);
            rect(player.touching.pos.x, player.touching.pos.y - (tileSize * 2), player.looking(currentLevel_x, currentLevel_y).phraseWidth, player.looking(currentLevel_x, currentLevel_y).phraseHeight);
            textAlign(CENTER, CENTER);
            textSize(15);
            fill(0);
            text(player.looking(currentLevel_x, currentLevel_y).phrase, player.touching.pos.x, player.touching.pos.y - (tileSize * 2), player.looking(currentLevel_x, currentLevel_y).phraseWidth, player.looking(currentLevel_x, currentLevel_y).phraseHeight);
            pop()
        }
        if (player.looking(currentLevel_x, currentLevel_y).htype != 'air' && player.looking(currentLevel_x, currentLevel_y).ammount > 0) {
            addItem(player.looking(currentLevel_x, currentLevel_y).htype, player.looking(currentLevel_x, currentLevel_y).ammount);
            player.looking(currentLevel_x, currentLevel_y).ammount = 0;
        }
    }
    if (player.looking(currentLevel_x, currentLevel_y) != undefined && player.facing == 1) {
        if (player.looking(currentLevel_x, currentLevel_y).age == -2) {
            push()
            stroke(0);
            fill(255);
            rectMode(CENTER);
            rect(player.touching.pos.x + (tileSize), player.touching.pos.y - (tileSize), player.looking(currentLevel_x, currentLevel_y).phraseWidth, player.looking(currentLevel_x, currentLevel_y).phraseHeight);
            textAlign(CENTER, CENTER);
            textSize(15);
            fill(0);
            text(player.looking(currentLevel_x, currentLevel_y).phrase, player.touching.pos.x + tileSize, player.touching.pos.y - (tileSize), player.looking(currentLevel_x, currentLevel_y).phraseWidth, player.looking(currentLevel_x, currentLevel_y).phraseHeight);
            pop()
        }
        if (player.looking(currentLevel_x, currentLevel_y).htype != 'air' && player.looking(currentLevel_x, currentLevel_y).ammount > 0) {
            addItem(player.looking(currentLevel_x, currentLevel_y).htype, player.looking(currentLevel_x, currentLevel_y).ammount);
            player.looking(currentLevel_x, currentLevel_y).ammount = 0;
        }
    }
    if (player.looking(currentLevel_x, currentLevel_y) != undefined && player.facing == 2) {
        if (player.looking(currentLevel_x, currentLevel_y).age == -2) {
            push()
            stroke(0);
            fill(255);
            rectMode(CENTER);
            rect(player.touching.pos.x, player.touching.pos.y, player.looking(currentLevel_x, currentLevel_y).phraseWidth, player.looking(currentLevel_x, currentLevel_y).phraseHeight);
            textAlign(CENTER, CENTER);
            textSize(15);
            fill(0);
            text(player.looking(currentLevel_x, currentLevel_y).phrase, player.touching.pos.x, player.touching.pos.y, player.looking(currentLevel_x, currentLevel_y).phraseWidth, player.looking(currentLevel_x, currentLevel_y).phraseHeight);
            pop()
        }
        if (player.looking(currentLevel_x, currentLevel_y).htype != 'air' && player.looking(currentLevel_x, currentLevel_y).ammount > 0) {
            addItem(player.looking(currentLevel_x, currentLevel_y).htype, player.looking(currentLevel_x, currentLevel_y).ammount);
            player.looking(currentLevel_x, currentLevel_y).ammount = 0;
        }
    }
    if (player.looking(currentLevel_x, currentLevel_y) != undefined && player.facing == 3) {
        if (player.looking(currentLevel_x, currentLevel_y).age == -2) {
            push()
            stroke(0);
            fill(255);
            rectMode(CENTER);
            rect(player.touching.pos.x - (tileSize), player.touching.pos.y - (tileSize), player.looking(currentLevel_x, currentLevel_y).phraseWidth, player.looking(currentLevel_x, currentLevel_y).phraseHeight);
            textAlign(CENTER, CENTER);
            textSize(15);
            fill(0);
            text(player.looking(currentLevel_x, currentLevel_y).phrase, player.touching.pos.x - tileSize, player.touching.pos.y - (tileSize), player.looking(currentLevel_x, currentLevel_y).phraseWidth, player.looking(currentLevel_x, currentLevel_y).phraseHeight);
            pop()
        }
        if (player.looking(currentLevel_x, currentLevel_y).htype != 'air' && player.looking(currentLevel_x, currentLevel_y).ammount > 0) {
            addItem(player.looking(currentLevel_x, currentLevel_y).htype, player.looking(currentLevel_x, currentLevel_y).ammount);
            player.looking(currentLevel_x, currentLevel_y).ammount = 0;
        }
    }
    if (player.touching.age == -3) {
        push()
        stroke(0)
        fill(255)
        rectMode(CENTER)
        rect(player.touching.pos.x + (tileSize / 2), player.touching.pos.y - tileSize, player.touching.phraseWidth, player.touching.phraseHeight);
        textAlign(CENTER, CENTER);
        textSize(15);
        fill(0);
        text(player.touching.price, player.touching.pos.x + (tileSize), player.touching.pos.y - tileSize, player.touching.phraseWidth, player.touching.phraseHeight);
        image(coin_img, player.touching.pos.x - (tileSize / 2), player.touching.pos.y - (tileSize * 1.5));
        pop()
    }
    if (player.touching.name == "cart_s") {
        push()
        stroke(0)
        fill(255)
        rectMode(CENTER)
        rect(player.touching.pos.x + (tileSize / 2), player.touching.pos.y - tileSize, player.touching.phraseWidth, player.touching.phraseHeight);
        textAlign(CENTER, CENTER);
        textSize(15);
        fill(0);
        text(player.touching.phrase, player.touching.pos.x + (tileSize / 2), player.touching.pos.y - (tileSize * 1.5), player.touching.phraseWidth, player.touching.phraseHeight);
        image(coin_img, player.touching.pos.x - (tileSize / 2), player.touching.pos.y - (tileSize * 1));
        if (player.inv[player.hand].price == 0) {
            fill(255, 0, 0);
            text("No", player.touching.pos.x + (tileSize), player.touching.pos.y - (tileSize / 2));
        }
        if (player.inv[player.hand].price > 0) {
            fill(0);
            text(player.inv[player.hand].price, player.touching.pos.x + (tileSize), player.touching.pos.y - (tileSize / 2));
        }
        pop()

    }
}

function new_tile_from_num(num, x, y) {
    if (num-1 <= all_tiles.length) {
        if (all_tiles[num - 1].class == 'Tile') {
            return new Tile(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].border, all_tiles[num - 1].collide, all_tiles[num - 1].age);
        }
        else if (all_tiles[num - 1].class == 'Plant') {
            return new Plant(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].border, all_tiles[num - 1].collide, all_tiles[num - 1].eat_num, all_tiles[num - 1].waterneed, all_tiles[num - 1].growthTime);
        }
        else if (all_tiles[num - 1].class == 'Entity') {
            return new Entity(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].inv, all_tiles[num - 1].hand, all_tiles[num - 1].under_tile_num);
        }
        else if (all_tiles[num - 1].class == 'FreeMoveEntity') {
            return new FreeMoveEntity(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].border, all_tiles[num - 1].collide, all_tiles[num - 1].age);
        }
        else if (all_tiles[num - 1].class == 'MovableEntity') {
            return new MovableEntity(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].border, all_tiles[num - 1].collide, all_tiles[num - 1].age);
        }
        else if (all_tiles[num - 1].class == 'GridMoveEntity') {
            return new GridMoveEntity(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].border, all_tiles[num - 1].collide, all_tiles[num - 1].age);
        }
        else if (all_tiles[num - 1].class == 'NPC') {
            return new NPC(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].border, all_tiles[num - 1].collide, all_tiles[num - 1].age);
        }
    }
    else {
        console.log('tile created from ' + num + ' doesnt exist');
    }
}

function new_item_from_num(num, amount) {
    if (num <= all_items.length) {
        if (all_items[num].class == 'Item') {
            return new Item(all_items[num].name, amount, all_items[num].png, all_items[num].price);
        }
        else if (all_items[num].class == 'Tool') {
            return new Tool(all_items[num].name, amount, all_items[num].png);
        }
        else if (all_items[num].class == 'Eat') {
            return new Eat(all_items[num].name, amount, all_items[num].png, all_items[num].price, all_items[num].hunger, all_items[num].hunger_timer, all_items[num].seed_num);
        }
        else if (all_items[num].class == 'Seed') {
            return new Seed(all_items[num].name, amount, all_items[num].png, all_items[num].plant_num);
        }
        else if (all_items[num].class == 'Placeable') {
            return new Placeable(all_items[num].name, amount, all_items[num].png, all_items[num].price, all_items[num].tile_num);
        }
    }
    else {
        console.log('item created from ' + num + ' doesnt exist');
    }
}
