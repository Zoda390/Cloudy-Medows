/*
@authors: Whole
@brief: Outputs to canvas
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
var Dialouge_JSON = 0;
var paused = false;
var musicSlider = 0;
var fxSlider = 0;
var mouse_item = 0;

var musicplayer = {};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function preload() {

    musicplayer = new MusicPlayer(['audio/Main_theme.wav','audio/calm_dings.mp3','audio/empty_burst.mp3','audio/Main_theme.mp3'])

    //Items
    fullcourse_img = loadImage('images/items/FullCourse.png');

    hoe_img = loadImage('images/items/Hoe.png');
    junk_img = loadImage('images/items/junk.png');
    compost_img = loadImage('images/items/Compost.png');
    sprinkler_img = loadImage('images/items/Sprinkler.png');

    //Tile
    grass_tile_img = loadImage('images/tiles/Grass.png');
    plot_tile_img = loadImage('images/tiles/Plot.png');
    wall_tile_img = loadImage('images/tiles/Wood.png');
    concrete_tile_img = loadImage('images/tiles/Concrete_1.png');
    dirt_tile_img = loadImage('images/tiles/dirt.png');
    bed_tile_img = loadImage('images/tiles/Bed.png');
    cart_s_tile_img = loadImage('images/tiles/Shop.png');
    cart_tile_img = loadImage('images/tiles/Cart.png');
    bridge_tile_img = loadImage('images/tiles/Bridge.png');
    bridge_tile_var_img = loadImage('images/tiles/Bridge2.png');
    bridge_tile_2_img = loadImage('images/tiles/BridgeFlip.png');
    bridge_tile_2var_img = loadImage('images/tiles/Bridge2Flip.png');
    junk_tile_img = loadImage('images/tiles/junk_tile.png');
    concrete_tile_2_img = loadImage('images/tiles/Concrete2.png');
    satilite_tile_img = loadImage('images/tiles/Satilite.png');
    solarpanel_tile_img = loadImage('images/tiles/SolarPanel.png');
    compost_bucket_tile_img = loadImage('images/tiles/Worm_Bucket.png');
    compost_tile_img = loadImage('images/tiles/Compost_tile.png');
    sprinkler_tile_img = loadImage('images/tiles/Sprinkler.gif');
    lamppost_tile_img = loadImage('images/tiles/Light.png');
    cart_sp_tile_img = loadImage('images/tiles/sp_cart.png');
    cart_straw_tile_img = loadImage('images/tiles/StrawCart.png');
    cart_flower_tile_img = loadImage('images/tiles/flowerShop.png');
    cart_ladybug_tile_img = loadImage('images/tiles/ladybug_cart.png');
    cart_sprinkler_tile_img = loadImage('images/tiles/sprinkler_cart.png');
    bush_img = loadImage("images/tiles/Bush.png");
    chest_img = loadImage('images/tiles/Chest.png');

    //NPC
    quest_marker_img = loadImage('images/ui/QuestMarker.png');
    Dialouge_JSON = loadJSON('dialouge_list.json');
    //Cowboy Rick
    rick_tile_up_img = loadImage('images/npc/cowboy_rick_back.png');
    rick_tile_right_img = loadImage('images/npc/cowboy_rick_right.png');
    rick_tile_down_img = loadImage('images/npc/cowboy_rick.png');
    rick_tile_left_img = loadImage('images/npc/cowboy_rick_left.png');
    rick_tile_imgs = [[rick_tile_up_img], [rick_tile_right_img], [rick_tile_down_img], [rick_tile_left_img]];

    //deb
    deb_tile_up_img = loadImage('images/npc/cowboy_rick_back.png');
    deb_tile_right_img = loadImage('images/npc/cowboy_rick_right.png');
    deb_tile_down_img = loadImage('images/npc/deb.png');
    deb_tile_left_img = loadImage('images/npc/cowboy_rick_left.png');
    deb_tile_imgs = [[deb_tile_up_img], [deb_tile_right_img], [deb_tile_down_img], [deb_tile_left_img]];

    //meb
    meb_tile_up_img = loadImage('images/npc/cowboy_rick.png');
    meb_tile_right_img = loadImage('images/npc/cowboy_rick_right.png');
    meb_tile_down_img = loadImage('images/npc/meb.png');
    meb_tile_left_img = loadImage('images/npc/cowboy_rick_left.png');
    meb_tile_imgs = [[meb_tile_up_img], [meb_tile_right_img], [meb_tile_down_img], [meb_tile_left_img]];

    //old man j
    old_man_j_tile_up_img = loadImage('images/npc/old_man_jay_back.png');
    old_man_j_tile_right_img = loadImage('images/npc/old_man_jay_right.png');
    old_man_j_tile_down_img = loadImage('images/npc/old_man_jay1.png');
    old_man_j_tile_left_img = loadImage('images/npc/old_man_jay_left.png');
    old_man_j_tile_imgs = [[old_man_j_tile_up_img], [old_man_j_tile_right_img], [old_man_j_tile_down_img], [old_man_j_tile_left_img]];

    //mira
    mira_tile_up_img = loadImage('images/npc/mira_back.png');
    mira_tile_right_img = loadImage('images/npc/mira_right.png');
    mira_tile_down_img = loadImage('images/npc/mira.png');
    mira_tile_left_img = loadImage('images/npc/mira_left.png');
    mira_tile_imgs = [[mira_tile_up_img], [mira_tile_right_img], [mira_tile_down_img], [mira_tile_left_img]];

    //mario
    mario_tile_up_img = loadImage('images/npc/cowboy_rick.png');
    mario_tile_right_img = loadImage('images/npc/cowboy_rick_right.png');
    mario_tile_down_img = loadImage('images/npc/mario.png');
    mario_tile_left_img = loadImage('images/npc/cowboy_rick_left.png');
    mario_tile_imgs = [[mario_tile_up_img], [mario_tile_right_img], [mario_tile_down_img], [mario_tile_left_img]];

    //liam
    liam_tile_up_img = loadImage('images/npc/liam_back.png');
    liam_tile_right_img = loadImage('images/npc/cowboy_rick_right.png');
    liam_tile_down_img = loadImage('images/npc/liam.png');
    liam_tile_left_img = loadImage('images/npc/cowboy_rick_left.png');
    liam_tile_imgs = [[liam_tile_up_img], [liam_tile_right_img], [liam_tile_down_img], [liam_tile_left_img]];

    //garry
    garry_tile_up_img = loadImage('images/npc/garry_back.png');
    garry_tile_right_img = loadImage('images/npc/cowboy_rick_right.png');
    garry_tile_down_img = loadImage('images/npc/garry.png');
    garry_tile_left_img = loadImage('images/npc/cowboy_rick_left.png');
    garry_tile_imgs = [[garry_tile_up_img], [garry_tile_right_img], [garry_tile_down_img], [garry_tile_left_img]];

    //bind pette
    blind_pette_tile_up_img = loadImage('images/npc/blind_pete_back.png');
    blind_pette_tile_right_img = loadImage('images/npc/cowboy_rick_right.png');
    blind_pette_tile_down_img = loadImage('images/npc/blind_pete.png');
    blind_pette_tile_left_img = loadImage('images/npc/cowboy_rick_left.png');
    blind_pette_tile_imgs = [[blind_pette_tile_up_img], [blind_pette_tile_right_img], [blind_pette_tile_down_img], [blind_pette_tile_left_img]];

    //brandon
    brandon_tile_up_img = loadImage('images/npc/brandon_back.png');
    brandon_tile_right_img = loadImage('images/npc/brandon_right.png');
    brandon_tile_down_img = loadImage('images/npc/brandon.png');
    brandon_tile_left_img = loadImage('images/npc/brandon_left.png');
    brandon_tile_imgs = [[brandon_tile_up_img], [brandon_tile_right_img], [brandon_tile_down_img], [brandon_tile_left_img]];

    //james
    james_tile_up_img = loadImage('images/npc/cowboy_rick.png');
    james_tile_right_img = loadImage('images/npc/cowboy_rick_right.png');
    james_tile_down_img = loadImage('images/npc/james.png');
    james_tile_left_img = loadImage('images/npc/cowboy_rick_left.png');
    james_tile_imgs = [[james_tile_up_img], [james_tile_right_img], [james_tile_down_img], [james_tile_left_img]];

    //brent
    brent_tile_up_img = loadImage('images/npc/cowboy_rick.png');
    brent_tile_right_img = loadImage('images/npc/cowboy_rick_right.png');
    brent_tile_down_img = loadImage('images/npc/brent.png');
    brent_tile_left_img = loadImage('images/npc/cowboy_rick_left.png');
    brent_tile_imgs = [[brent_tile_up_img], [brent_tile_right_img], [brent_tile_down_img], [brent_tile_left_img]];

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
    music_note_img = loadImage('images/ui/Music_Note.png');
    fx_img = loadImage('images/ui/fx.png');
    skull_img = loadImage('images/ui/dealth_icon(128x128).png');

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
    corn_img = loadImage('images/items/Corn_item.png');
    corn_seed_bag_img = loadImage('images/items/Corn_Seed_bag.png');
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
    sweet_potato_seed_bag_img = loadImage('images/items/seedbag_sp.png');
    sweet_potato_img = loadImage('images/items/SweetPotato.png');
    sweet_potato_tile_img = loadImage('images/tiles/beets_1.png');
    sweet_potato_tile_2_img = loadImage('images/tiles/beets_2.png');
    sweet_potato_tile_3_img = loadImage('images/tiles/beets_3.png');
    sweet_potato_tile_4_img = loadImage('images/tiles/beets_4.png');
    sweet_potato_tile_5_img = loadImage('images/tiles/beets_5.png');
    sweet_potato_tile_imgs = [sweet_potato_tile_img, sweet_potato_tile_2_img, sweet_potato_tile_3_img, sweet_potato_tile_4_img, sweet_potato_tile_5_img];

    //Strawberry 20
    straw_img = loadImage('images/items/Stawberry.png');
    strawberry_seed_bag_img = loadImage('images/items/SeedBag_Stawberry.png');
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

    //tomato 43
    tomato_img = loadImage("images/items/tomato.png");
    tomato_seed_bag_img = loadImage("images/items/tomato_bag.png");
    tomato_tile_img = loadImage("images/tiles/tomato_1.png");
    tomato_tile_img2 = loadImage("images/tiles/tomato_2.png");
    tomato_tile_img3 = loadImage("images/tiles/tomato_3.png");
    tomato_tile_img4 = loadImage("images/tiles/tomato_4.png");
    tomato_tile_img5 = loadImage("images/tiles/tomato_5.png");
    tomato_tile_img6 = loadImage("images/tiles/tomato_6.png");
    tomato_tile_imgs = [tomato_tile_img, tomato_tile_img2, tomato_tile_img3, tomato_tile_img4, tomato_tile_img5, tomato_tile_img6];

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
    fore_1_img = loadImage('images/foreground/fore1.png');
    fore_2_img = loadImage('images/foreground/fore_gray_2.png');
    fore_4_img = loadImage('images/foreground/fore4.png');
    fore_6_img = loadImage('images/foreground/Fore6.png');
    fore_cloud_img = loadImage('images/foreground/Cloud_Tile.png');
    fore_building_img = loadImage('images/foreground/Building_Low.png');
    fore_red_building_img = loadImage('images/foreground/Red_building_low.png');
    fore_red_grown_building_img = loadImage('images/foreground/red_building_low2.png');
    fore_gray_building_img = loadImage('images/foreground/building_gray.png');

    /*
    class           obj
    Tile            { name: 'name', png: png_img, border: true, collide: false, age: -1, class: 'Tile' }
    Shop            { name: 'name', png: png_img, inv: [], class: 'Shop'}
    Plant           { name: 'name', png: png_img, border: true, collide: false, age: 0, eat_num: 0, waterneed: 0, growthTime: 0, class: 'Plant' }  2000 growthTime is about 1 day
    Entity          { name: 'name', png: png_img, border: true, collide: false, age: -1, inv: [0, {num: 1, amount: 1}], hand: 0, under_tile_num: 0, class: 'Entity' }
    FreeMoveEntity  { name: 'name', png: png_img, border: true, collide: false, age: -1, class: 'FreeMoveEntity' }
    MoveableEntity  { name: 'name', png: png_img, inv: [0, {num: 1, amount: 1}], hand: 0, facing: 2, under_tile_num: 0, moving_timer: 0, class: 'MoveableEntity' }
    GridMoveEntity  { name: 'name', png: png_img, inv: [0, {num: 1, amount: 1}], hand: 0, facing: 2, under_tile_num: 0, instructions: [], moving_timer: 0, class: 'GridMoveEntity' }
    NPC             { name: 'name', png: png_img, inv: [0, {num: 1, amount: 1}], hand: 0, facing: 2, under_tile_num: 0, instructions: [], moving_timer: 0, class: 'NPC' }
    */
    all_tiles = [
    /*1*/    { name: 'concrete', png: [concrete_tile_img, concrete_tile_2_img], border: true, collide: false, age: -1, class: 'Tile' },
    /*2*/    { name: 'grass', png: [grass_tile_img], border: true, collide: false, age: -1, class: 'Tile' },
    /*3*/    { name: 'plot', png: [plot_tile_img], border: true, collide: false, age: 0, class: 'Tile' },
    /*4*/    { name: 'dirt', png: [dirt_tile_img], border: true, collide: false, age: -1, class: 'Tile' },
    /*5*/    { name: 'junk', png: [junk_tile_img], border: true, collide: false, age: -1, class: 'Tile' },
    /*6*/    { name: 'wall', png: [wall_tile_img], border: true, collide: true, age: -1, class: 'Tile' },
    /*7*/    { name: 'bed', png: [bed_tile_img], border: true, collide: false, age: -1, class: 'Tile' },
    /*8*/    { name: 'bridge', png: [bridge_tile_img, bridge_tile_var_img], border: false, collide: false, age: -1, class: 'Tile' },
    /*9*/    { name: 'bridge2', png: [bridge_tile_2_img, bridge_tile_2var_img], border: true, collide: false, age: -1, class: 'Tile' },
    /*10*/    { name: 'satilite', png: [satilite_tile_img], border: true, collide: true, age: -1, class: 'Tile' },
    /*11*/    { name: 'solarpanel', png: [solarpanel_tile_img], border: true, collide: true, age: -1, class: 'Tile' },
    /*12*/    { name: 'lamppost', png: [lamppost_tile_img], border: true, collide: true, age: -1, class: 'Tile' },
    /*13*/    { name: 'compost_tile', png: [compost_tile_img], border: true, collide: false, age: 0, class: 'Tile' },
    /*14*/    { name: 'compost_bucket', png: [compost_bucket_tile_img], border: true, collide: false, age: -1, class: 'Tile' },
    /*15*/    { name: 'cart_s', png: [cart_s_tile_img], border: true, collide: true, age: -1, class: 'Tile' },
    /*16*/    { name: 'Fruits', png: [cart_tile_img, cart_sp_tile_img, cart_straw_tile_img], inv: [{ num: 2, amount: 7}, {num: 5, amount: 6}, {num: 7, amount: 0}], class: 'Shop' },
    /*17*/    { name: 'Ladybugs and Flowers', png: [cart_ladybug_tile_img, cart_flower_tile_img], inv: [{num: 10, amount: 6}, {num: 11, amount: 6}], class: 'Shop' },
    /*18*/    { name: 'Sprinklers', png: [cart_sprinkler_tile_img], inv: [{num: 12, amount: 6}], class: 'Shop' },
    /*19*/    { name: 'Seeds', png: [cart_tile_img, cart_sp_tile_img, cart_straw_tile_img], inv: [{ num: 3, amount: 7}, {num: 6, amount: 6}, {num: 8, amount: 0}], class: 'Shop' },
    /*20*/    { name: 'sprinkler', png: [sprinkler_tile_img], border: true, collide: false, age: -1, class: 'Tile' },
    /*21*/    { name: 'corn', png: corn_tile_imgs, border: true, collide: false, age: 0, eat_num: 2, waterneed: 0, growthTime: 2000, class: 'Plant' },
    /*22*/    { name: 'sweet_potato', png: sweet_potato_tile_imgs, border: true, collide: false, age: 0, eat_num: 5, waterneed: 0, growthTime: 2200, class: 'Plant' },
    /*23*/    { name: 'strawberry', png: strawberry_tile_imgs, border: true, collide: false, age: 0, eat_num: 7, waterneed: 1, growthTime: 1900, class: 'Plant' },
    /*24*/    { name: 'tomato', png: tomato_tile_imgs, border: true, collide: false, age: 0, eat_num: 15, waterneed: 1, growthTime: 1300, class: 'Plant' },
    /*25*/    { name: 'flower', png: flower_tile_imgs, border: true, collide: false, age: 0, eat_num: 0, waterneed: 0, growthTime: 1000, class: 'Plant' },
    /*26*/    { name: 'ladybug', png: ladybug_img, border: true, collide: false, age: 0, inv: [0], hand: 0, under_tile_num: 2, class: 'Entity' },
    /*27*/    { name: 'Rick', png: rick_tile_imgs, inv: [{ num: 7, amount: 2 }], hand: 0, facing: 2, under_tile_num: 1, instructions: ['left', 'left', 'left', 'left', 'left', 'left', 'left', 'up', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'down', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left'], moving_timer: 100, class: 'NPC' },
    /*28*/    { name: 'Deb', png: deb_tile_imgs, inv: [{num: 4, amount: 3}], hand: 0, facing: 2, under_tile_num: 1, instructions: [], moving_timer: 0, class: 'NPC' },
    /*29*/    { name: 'Mario', png: mario_tile_imgs, inv: [{num: 12, amount: 1}], hand: 0, facing: 2, under_tile_num: 1, instructions: [], moving_timer: 100, class: 'NPC' },
    /*30*/    { name: 'Garry', png: garry_tile_imgs, inv: [0], hand: 0, facing: 2, under_tile_num: 1, instructions: ['down', 'up'], moving_timer: 100, class: 'NPC' },
    /*31*/    { name: 'Mira', png: mira_tile_imgs, inv: [0], hand: 0, facing: 2, under_tile_num: 1, instructions: ['down', 'left', 'up', 'right'], moving_timer: 100, class: 'NPC' },
    /*32*/    { name: 'OldManJ', png: old_man_j_tile_imgs, inv: [0], hand: 0, facing: 2, under_tile_num: 1, instructions: ['left', 'left', 'left', 'down', 'right', 'right', 'right', 'up'], moving_timer: 100, class: 'NPC' },
    /*33*/    { name: 'Brandon', png: brandon_tile_imgs, inv: [0], hand: 0, facing: 2, under_tile_num: 1, instructions: ['up', 'right', 'down', 'left'], moving_timer: 100, class: 'NPC' },
    /*34*/    { name: 'Brent', png: brent_tile_imgs, inv: [0], hand: 0, facing: 2, under_tile_num: 1, instructions: [], moving_timer: 100, class: 'NPC' },
    /*35*/    { name: 'Blind_Pette', png: blind_pette_tile_imgs, inv: [0], hand: 0, facing: 2, under_tile_num: 1, instructions: ['up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'down', 'down', 'down', 'down', 'down', 'down', 'down', 'down', 'down', 'down', 'down', 'down', 'down', 'down'], moving_timer: 100, class: 'NPC' },
    /*36*/    { name: 'James', png: james_tile_imgs, inv: [0], hand: 0, facing: 2, under_tile_num: 1, instructions: [], moving_timer: 100, class: 'NPC' },
    /*37*/    { name: 'Liam', png: liam_tile_imgs, inv: [0], hand: 0, facing: 2, under_tile_num: 1, instructions: ['up', 'up', 'down', 'down'], moving_timer: 100, class: 'NPC' },
    /*38*/    { name: 'Meb', png: meb_tile_imgs, inv: [0], hand: 0, facing: 2, under_tile_num: 1, instructions: [], moving_timer: 100, class: 'NPC' },
    /*39*/    { name: 'bush', png: [bush_img], border: false, collide: true, age: -1, class: 'Tile' },
    /*40*/    { name: 'chest', png: chest_img, inv: [0, { num: 4, amount: 1}, 0, 0, 0, 0, 0, 0, 0, 0, 0, { num: 4, amount: 2}], facing: 2, under_tile_num: 1, class: 'Chest'}
    ];
    /*
    class       obj
    Item        {name: 'name', png: png_img, price: 0, class: 'Item'}
    Tool        {name: 'name', png: png_img, class: 'Tool'}
    Eat         {name: 'name', png: png_img, price: 0, hunger: 0, hunger_timer: 0, seed_num: 0, class: 'Eat'}
    Seed        {name: 'name', png: png_img, plant_num: 0, class: 'Seed'}
    Placable    {name: 'name', png: png_img, price: 0, tile_num: 0, tile_need_num: 0, class: 'Placeable'}
    */
    all_items = [
        /*0*/ 0,
        /*1*/ { name: 'Hoe', png: hoe_img, class: 'Tool' },
        /*2*/ { name: 'Corn', png: corn_img, price: 4, hunger: 2, hunger_timer: 2000, seed_num: 3, class: 'Eat' },
        /*3*/ { name: 'Corn Seed', png: corn_seed_bag_img, plant_num: 21, class: 'Seed' },
        /*4*/ { name: 'Junk', png: junk_img, price: 0, class: 'Item' },
        /*5*/ { name: 'Sweet Potatos', png: sweet_potato_img, price: 3, hunger: 1, hunger_timer: 3000, seed_num: 6, class: 'Eat' },
        /*6*/ { name: 'Sweet Potato Seed', png: sweet_potato_seed_bag_img, plant_num: 22, class: 'Seed' },
        /*7*/ { name: 'Strawberries', png: straw_img, price: 2, hunger: 1, hunger_timer: 1700, seed_num: 8, class: 'Eat' },
        /*8*/ { name: 'Strawberry Seed', png: strawberry_seed_bag_img, plant_num: 23, class: 'Seed' },
        /*9*/ { name: 'Compost', png: compost_img, price: 2, tile_num: 13, tile_need_num: 4, class: 'Placeable' },
        /*10*/{ name: 'Ladybugs', png: ladybug_bag_img, price: 100, tile_num: 26, tile_need_num: 2, class: 'Placeable' },
        /*11*/{ name: 'Flower Seed', png: flower_bag_img, plant_num: 25, class: 'Seed'},
        /*12*/{ name: 'Sprinkler', png: sprinkler_img, price: 9, tile_num: 20, tile_need_num: 2, class: 'Placeable' },
        /*13*/{ name: 'Full Course', png: fullcourse_img, price: 20, hunger: 100, hunger_timer: 4000, seed_num: 0, class: 'Eat' },
        /*14*/{name: 'Tomato Seed', png: tomato_seed_bag_img, plant_num: 24, class: 'Seed'},
        /*15*/{name: 'Tomato', png: tomato_img, price: 3, hunger: 1, hunger_timer: 1800, seed_num: 14, class: 'Eat'}
    ];
}

var current_reply = 0;
function setup() {
    createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i < cloudCount; i++) {
        clouds[i] = new Cloud()
    }
    player = new Player('player1', player_imgs, (5 * tileSize), (5 * tileSize));
    
    musicSlider = createSlider(0, 1, 1, 0.01);
    musicSlider.position((canvasWidth/2)-10, (canvasHeight/2)-85);
    musicSlider.hide();

    fxSlider = createSlider(0, 1, 1, 0.01);
    fxSlider.position((canvasWidth/2)-10, (canvasHeight/2)-5);
    fxSlider.hide();

    //Home
    level1 = new Level('Home', [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [8, 8, 1, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 1, 0, 0, 0], 
        [0, 0, 1, 6, 7, 1, 6, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 6, 40, 1, 6, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 6, 6, 1, 6, 12, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 39, 1, 1, 1, 1, 1, 1, 8, 8, 8], 
        [0, 0, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 11, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 11, 11, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3],
        [3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2],
        [3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2],
        [2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2]
    ]
    );
    //Compost
    level2 = new Level
        ('Compost', [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
            [0, 0, 1, 12, 1, 1, 1, 1, 1, 38, 14, 28, 1, 1, 1, 1, 1, 1, 12, 1, 0, 0, 0], 
            [0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 0], 
            [0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 0], 
            [0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 0], 
            [0, 0, 1, 1, 1, 1, 1, 1, 32, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
            [8, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
            [0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0], 
            [0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0], 
            [0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0], 
            [0, 0, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 1, 0, 0, 0], 
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2],
            [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2],
            [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2],
            [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2],
            [3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3],
            [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3],
            [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3],
            [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3],
            [3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
            [3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3],
            [3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 3],
            [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 2],
            [2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3],
            [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 3],
            [2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 2]
        ]
        );
    //Strawberry farm
    level3 = new Level('Strawberry farm', [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 0, 0, 0], 
        [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 8, 8, 8], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 27, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0], 
        [0, 0, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
        [3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 2]
    ]
    );
    //village
    level4 = new Level('Village', [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 0, 0, 0], 
        [0, 0, 1, 6, 6, 6, 6, 1, 1, 6, 6, 6, 6, 1, 1, 6, 6, 6, 6, 1, 0, 0, 0], 
        [0, 0, 1, 6, 7, 30, 6, 1, 1, 6, 7, 1, 6, 1, 1, 6, 7, 1, 6, 1, 0, 0, 0], 
        [0, 0, 1, 6, 1, 1, 6, 1, 1, 6, 1, 1, 6, 1, 1, 6, 1, 1, 6, 1, 0, 0, 0], 
        [0, 0, 1, 6, 6, 1, 6, 1, 12, 6, 6, 1, 6, 12, 1, 6, 6, 1, 6, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 8, 8], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [8, 8, 1, 1, 1, 1, 1, 1, 1, 6, 1, 6, 6, 1, 1, 6, 1, 6, 6, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 6, 1, 1, 6, 1, 1, 6, 1, 0, 0, 0], 
        [0, 0, 1, 1, 37, 40, 1, 1, 1, 6, 1, 7, 6, 1, 12, 6, 1, 7, 6, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 6, 6, 6, 6, 1, 1, 6, 6, 6, 6, 1, 0, 0, 0], 
        [0, 0, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2],
        [3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2],
        [3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2],
        [3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2],
        [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
        [3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3]
    ]
    );
    //abandened plot
    level5 = new Level('Abandened Plot', [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0], 
        [0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0], 
        [0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0], 
        [0, 1, 1, 12, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0], 
        [0, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0], 
        [0, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0], 
        [0, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0], 
        [0, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0], 
        [0, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 8, 8, 8, 8], 
        [0, 1, 1, 12, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0], 
        [0, 0, 0, 0, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0], 
        [0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0], 
        [0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 3, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 3, 3],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 3],
        [3, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 3, 3],
        [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 3],
        [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 2, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 2, 2],
        [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 2, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 2, 3]
    ]
    );
    //market
    level6 = new Level('Market', [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 1, 1, 1, 1, 34, 1, 1, 1, 1, 1, 36, 1, 1, 1, 0, 0, 0, 0, 0], 
        [0, 0, 0, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [8, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 31, 1, 1, 1, 12, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 17, 1, 1, 1, 1, 1, 1, 1, 19, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 0, 1, 12, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], 
        [0, 0, 0, 0, 1, 1, 1, 1, 16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 15, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 3, 3, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 2, 3, 3],
        [2, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 3],
        [2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3],
        [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3],
        [2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 2, 2],
        [2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 2, 2],
        [2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 2, 2],
        [2, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3],
        [3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2]
    ]
    );
    //Blind pete
    level7 = new Level('Scary Edge', [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 9, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 8, 8], 
        [0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 4, 4, 4, 4, 4, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 4, 4, 4, 4, 4, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 4, 4, 4, 4, 4, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 8, 8, 8], 
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2],
        [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3],
        [3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3],
        [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2],
        [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3],
        [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3],
        [2, 3, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
        [2, 3, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3],
        [2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3],
        [3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3]
    ]
    );
    //many bridge
    level8 = new Level('Many Bridge', [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 12, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 12, 0, 0], 
        [8, 8, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0], 
        [0, 0, 1, 2, 2, 2, 1, 8, 8, 8, 8, 8, 8, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 9, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0], 
        [0, 0, 0, 9, 0, 0, 0, 0, 0, 9, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0], 
        [0, 0, 0, 9, 0, 0, 0, 0, 0, 9, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0], 
        [0, 0, 0, 9, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0], 
        [0, 0, 0, 9, 0, 0, 1, 2, 2, 2, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], 
        [0, 0, 0, 9, 0, 0, 12, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0], 
        [0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0], 
        [8, 8, 8, 2, 8, 1, 1, 1, 8, 8, 1, 1, 1, 1, 1, 29, 0, 0, 0, 9, 0, 0, 0], 
        [0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 2, 2, 2, 2, 1, 8, 8, 8, 2, 0, 0, 0], 
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 3, 0, 0, 0, 0, 0, 2, 3, 2, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
        [3, 2, 0, 0, 0, 0, 0, 2, 3, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2],
        [3, 2, 0, 0, 0, 0, 0, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
        [3, 2, 1, 1, 1, 1, 1, 2, 3, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
        [2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3],
        [3, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
        [2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2],
        [2, 3, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2],
        [3, 3, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 2, 2],
        [3, 3, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2],
        [3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2],
        [3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2]
    ]
    );
    //big green plot
    level9 = new Level('Big Green Plot', [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 1, 0, 0, 0], 
        [0, 0, 1, 1, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 4, 2, 2, 2, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 1, 1, 0, 0, 0], 
        [0, 0, 1, 1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0], 
        [0, 0, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 1, 0, 0, 0], 
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2]
    ]
    );
    levels = [[level5, level4, level6],
    [level3, level1, level2],
    [level7, level8, level9]
    ];
    levels[currentLevel_y][currentLevel_x].level_name_popup = true;
}

function draw() {
    
    musicplayer.update()

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
        if (!paused){
            for (let y = 0; y < levels.length; y++) {
                for (let x = 0; x < levels[y].length; x++) {
                    if (levels[y][x] != 0) {
                        levels[y][x].update(x, y);
                    }
                }
            }
        }
        player.render();
        if(!player.dead){
            background(0, 0, 0, time);
            render_ui();
        }
        
        if (!paused){
            if (millis() - lastTimeMili > 300) { //300 for 2 min 1 day, 150 for 1 min 1 day
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
                lastTimeMili = millis();
            }
        }
    }
}


function addItem(item_obj_num, amount) {
    for (let i = 0; i < 8; i++) {
        if (player.inv[i] != 0) { // stack items
            if (player.inv[i].name == all_items[item_obj_num].name) {
                player.inv[i].amount += amount;
                return;
            }
        }
    }
    if (player.inv[player.hand] == 0) { // air
        player.inv[player.hand] = new_item_from_num(item_obj_num, amount);
        return;
    }

    for (let i = 0; i < 8; i++) {
        if (player.inv[i] == 0) { // find space
            player.inv[i] = new_item_from_num(item_obj_num, amount);
            return;
        }
    }
}

function checkForSpace(item_obj_num){
    var check = false;
    for (let i = 0; i < 8; i++) {
        if (player.inv[i] != 0) { // stack items
            if (player.inv[i].name == all_items[item_obj_num].name) {
                check = true;
                return check;
            }
        }
    }
    if (player.inv[player.hand] == 0) { // air in hand
        check = true;
        return check;
    }

    for (let i = 0; i < 8; i++) {
        if (player.inv[i] == 0) { // find space
            check = true;
            return check;
        }
    }
    return check;
}

function item_name_to_num(item_name) {
    for (let i = 0; i < all_items.length; i++) {
        if (item_name == all_items[i].name) {
            return i;
        }
    }
}

function tile_name_to_num(tile_name) {
    for (let i = 0; i < all_tiles.length; i++) {
        if (tile_name == all_tiles[i].name) {
            return i;
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
var pause_button = 27;     //esc
function takeInput() {
    if (title_screen) {
        if (keyIsDown(interact_button)) {
            title_screen = false;
        }
    }
    else if(paused){
        if(keyIsDown(pause_button)){
            if (millis() - lastMili > 200) {
                paused = false;
                lastMili = millis();
            }
        }
    }
    else if(player.talking != 0){
        if(keyIsDown(pause_button)){
            if (millis() - lastMili > 200) {
                paused = true;
                lastMili = millis();
            }
        }
        if (keyIsDown(eat_button)) {
            if (millis() - lastMili > 200) {
                if(player.talking.class == 'NPC'){
                    player.talking.move_bool = true;
                    player.talking.current_dialouge = 0;
                    for(let i = 0; i < player.talking.dialouges.length; i++){
                        player.talking.dialouges[i].done = false;
                        player.talking.dialouges[i].phrase = [];
                        if(player.talking.dialouges[i].new_phrase != -1){
                            player.talking.dialouges[i].phrase2 = player.talking.dialouges[i].new_phrase;
                            player.talking.dialouges[i].new_phrase = -1;
                        }
                        if(player.talking.dialouges[i].new_replies != -1){
                            for(let j = 0; j < player.talking.dialouges[i].new_replies.length; j++){
                                player.talking.dialouges[i].replies[j] = player.talking.dialouges[i].new_replies[j];
                            }
                            player.talking.dialouges[i].new_replies = -1;
                        }
                    }
                }
                else if(player.talking.class == 'Chest'){
                    if(mouse_item != 0){
                        if(checkForSpace(item_name_to_num(mouse_item.name))){
                            addItem(item_name_to_num(mouse_item.name), mouse_item.amount);
                            mouse_item = 0;
                        }
                        else{
                            let dropped = false;
                            for (let i = 0; i < player.talking.inv.length; i++) {
                                for(let j = 0; j < player.talking.inv[i].length; j++){
                                    if (player.talking.inv[i][j] != 0) { // stack items
                                        if (player.talking.inv[i][j].name == mouse_item.name) {
                                            player.talking.inv[i][j].amount += mouse_item.amount;
                                            dropped = true;
                                        }
                                    }
                                }
                            }
                            for (let i = 0; i < player.talking.inv.length; i++) {
                                for(let j = 0; j < player.talking.inv[i].length; j++){
                                    if (player.inv[i] == 0) { // empty space
                                        player.talking.inv[i][j] = mouse_item;
                                        dropped = true;
                                    }
                                }
                            }
                            if(!dropped){
                                return;
                            }
                        }
                    }
                }
                player.oldlooking_name = player.talking.name;
                player.talking = 0;
                current_reply = 0;
                lastMili = millis();
                player.lasteatMili = millis();
            }
        }
        if (keyIsDown(move_up_button)){
            if ((millis() - lastMili > 200) && player.talking.class != 'Chest') {
                current_reply -= 1;
                if (current_reply < 0){
                    current_reply = 0;
                }
                lastMili = millis();
            }
        }
        if (keyIsDown(move_down_button)){
            if (millis() - lastMili > 200) {
                current_reply += 1;
                if (player.talking.class == 'NPC'){
                    if (current_reply > player.talking.dialouges[player.talking.current_dialouge].replies.length-1){
                        current_reply = player.talking.dialouges[player.talking.current_dialouge].replies.length-1;
                    }
                }
                else if (player.talking.class == 'Shop'){
                    if (current_reply > player.talking.inv.length-1){
                        current_reply = player.talking.inv.length-1;
                    }
                }
                lastMili = millis();
            }
        }
        if (keyIsDown(interact_button)){
            if (millis() - lastMili > 200) {
                if (player.talking.class == 'NPC'){
                    if(player.talking.dialouges[player.talking.current_dialouge].replies[current_reply].dialouge_num == -1){
                        player.talking.move_bool = true;
                        player.talking.current_dialouge = 0;
                        for(let i = 0; i < player.talking.dialouges.length; i++){
                            player.talking.dialouges[i].done = false;
                            player.talking.dialouges[i].phrase = [];
                            if(player.talking.dialouges[i].new_phrase != -1){
                                player.talking.dialouges[i].phrase2 = player.talking.dialouges[i].new_phrase;
                                player.talking.dialouges[i].new_phrase = -1;
                            }
                            if(player.talking.dialouges[i].new_replies != -1){
                                for(let j = 0; j < player.talking.dialouges[i].new_replies.length; j++){
                                    player.talking.dialouges[i].replies[j] = player.talking.dialouges[i].new_replies[j];
                                }
                                player.talking.dialouges[i].new_replies = -1;
                            }
                        }
                        player.oldlooking_name = player.talking.name;
                        player.talking = 0;
                        current_reply = 0;
                    }
                    else{
                        player.talking.current_dialouge = player.talking.dialouges[player.talking.current_dialouge].replies[current_reply].dialouge_num;
                    }
                }
                else if (player.talking.class == 'Shop'){
                    if(player.talking.inv[current_reply].amount >= 1){
                        if(player.coins >= player.talking.inv[current_reply].price){    //check if you have the money
                            addItem(item_name_to_num(player.talking.inv[current_reply].name), 1);
                            player.coins -= player.talking.inv[current_reply].price; //reduce money
                            player.talking.inv[current_reply].amount -= 1; //shop.inv -1 amount
                        }
                    }
                }
                lastMili = millis();
            }
            
        }
        if (keyIsDown(80)) { //p
            if (millis() - lastMili > 100) {
                console.log(player);
                console.log(player.touching);
                console.log(player.looking(currentLevel_x, currentLevel_y));
                console.log(all_tiles)
                lastMili = millis();
                player.hunger = maxHunger;
            }
        }
    }
    else {
        if(keyIsDown(pause_button)){
            if (millis() - lastMili > 200) {
                paused = true;
                lastMili = millis();
            }
        }
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
                console.log(player.looking(currentLevel_x, currentLevel_y));
                console.log(all_tiles)
                lastMili = millis();
                player.hunger = maxHunger;
            }
        }
    }
}

//Christian's function to make UI more readible, positioning + math stuff
function render_ui() {
    //calendar
    push();
    image(calendar_img, canvasWidth - 70, 6);
    textFont(player_2);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(13);
    text('days', canvasWidth - 39, 30);
    textSize(15);
    text(days, canvasWidth - 40, 50);
    pop();

    if(levels[currentLevel_y][currentLevel_x].level_name_popup){
        levels[currentLevel_y][currentLevel_x].name_render();
    }

    if (player.looking(currentLevel_x, currentLevel_y) != undefined && player.talking != 0 && player.looking(currentLevel_x, currentLevel_y).class != 'Chest') {
        if (player.looking(currentLevel_x, currentLevel_y).class == 'NPC' ){
            player.looking(currentLevel_x, currentLevel_y).move_bool = false;
            player.looking(currentLevel_x, currentLevel_y).dialouge_render();
        }
        else if (player.looking(currentLevel_x, currentLevel_y).class == 'Shop'){
            player.looking(currentLevel_x, currentLevel_y).shop_render();
        }
        for (let i = 0; i < maxHunger; i++) {
            image(hunger_e, (canvasWidth / 20) + (30 * i), (canvasHeight - 185));
        }
        for (let i = 0; i < player.hunger; i++) {
            image(hunger_f, (canvasWidth / 20) + (30 * i), (canvasHeight - 185));
        }
        textFont(player_2);
        textSize(32.5);
        fill(0);
        textAlign(LEFT, TOP);
        image(coin_img, canvasWidth - 140, (canvasHeight - 185));
        text(player.coins, canvasWidth - 110, (canvasHeight - 182.5));
    }
    else{
        if (player.looking(currentLevel_x, currentLevel_y) != undefined && player.talking != 0 && player.looking(currentLevel_x, currentLevel_y).class == 'Chest'){
            player.looking(currentLevel_x, currentLevel_y).chest_render();
        }
        image(inv_img, (canvasWidth / 2) - (512 / 2), canvasHeight - 64);
        image(inv_hand_img, (canvasWidth / 2) - (512 / 2) + (64 * player.hand), canvasHeight - 64);
        
        for (let i = 0; i < 8; i++) {
            if (player.inv[i] == undefined) {
                player.inv[i] = 0;
            }
            if (player.inv[i] != 0) {
                player.inv[i].render(112 + (i * 64), canvasHeight - 64);
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
        textFont(player_2);
        textSize(32.5);
        fill(0);
        textAlign(LEFT, TOP);
        image(coin_img, (canvasWidth / 2) + (512 / 2) - 100, (canvasHeight - 95));
        text(player.coins, (canvasWidth / 2) + (512 / 2) - 64, (canvasHeight - 92.5));
        if(mouse_item != 0 && player.looking(currentLevel_x, currentLevel_y) != undefined && player.talking != 0 && player.looking(currentLevel_x, currentLevel_y).class == 'Chest'){
            mouse_item.render(mouseX, mouseY)
        }
        if (player.looking(currentLevel_x, currentLevel_y) != undefined && player.looking(currentLevel_x, currentLevel_y).name == "cart_s") {
            push()
            stroke(0)
            stroke(149, 108, 65);
            strokeWeight(5);
            fill(187, 132, 75);
            rectMode(CENTER)
            rect(player.looking(currentLevel_x, currentLevel_y).pos.x + (tileSize / 2), player.looking(currentLevel_x, currentLevel_y).pos.y - tileSize, 90, 70);
            textAlign(CENTER, CENTER);
            textSize(15);
            fill(255);
            stroke(0);
            strokeWeight(4);
            text('Sell', player.looking(currentLevel_x, currentLevel_y).pos.x + (tileSize / 2), player.looking(currentLevel_x, currentLevel_y).pos.y - (tileSize * 1.5), 90, 70);
            image(coin_img, player.looking(currentLevel_x, currentLevel_y).pos.x - (tileSize / 2) - 5, player.looking(currentLevel_x, currentLevel_y).pos.y - (tileSize * 1));
            if (player.inv[player.hand].price == 0 || player.inv[player.hand] == 0) {
                fill(255, 0, 0);
                text("No", player.looking(currentLevel_x, currentLevel_y).pos.x + (tileSize), player.looking(currentLevel_x, currentLevel_y).pos.y - (tileSize / 2));
            }
            if (player.inv[player.hand].price > 0) {
                fill(255);
                text(player.inv[player.hand].price, player.looking(currentLevel_x, currentLevel_y).pos.x + (tileSize), player.looking(currentLevel_x, currentLevel_y).pos.y - (tileSize / 2));
            }
            pop()
    
        }
    }
    if(paused){
        push()
        stroke(149, 108, 65);
        strokeWeight(5);
        fill(187, 132, 75);
        rectMode(CENTER);
        rect(canvasWidth/2, (canvasHeight/2)-30, 400, 400);
        fill(255);
        stroke(0);
        strokeWeight(2);
        textFont(player_2);
        textAlign(CENTER, CENTER);
        text('Paused', canvasWidth/2, (canvasHeight/3)-30);
        musicSlider.show();
        fxSlider.show();
        image(music_note_img, (canvasWidth/2)-65, (canvasHeight/3)-5);
        image(fx_img, (canvasWidth/2)-65, (canvasHeight/2)-30);

        pop()
    }
    else{
        musicSlider.hide();
        fxSlider.hide();
    }
}

function new_tile_from_num(num, x, y) {
    if (num-1 <= all_tiles.length) {
        if (all_tiles[num - 1].class == 'Tile') {
            return new Tile(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].border, all_tiles[num - 1].collide, all_tiles[num - 1].age);
        }
        else if (all_tiles[num - 1].class == 'Shop') {
            return new Shop(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].inv);
        }
        else if (all_tiles[num - 1].class == 'Plant') {
            return new Plant(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].border, all_tiles[num - 1].collide, all_tiles[num - 1].eat_num, all_tiles[num - 1].waterneed, all_tiles[num - 1].growthTime);
        }
        else if (all_tiles[num - 1].class == 'Entity') {
            return new Entity(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].age, all_tiles[num - 1].inv, all_tiles[num - 1].hand, all_tiles[num - 1].under_tile_num);
        }
        else if (all_tiles[num - 1].class == 'FreeMoveEntity') {
            return new FreeMoveEntity(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].border, all_tiles[num - 1].collide, all_tiles[num - 1].age);
        }
        else if (all_tiles[num - 1].class == 'MovableEntity') {
            return new MoveableEntity(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].inv, all_tiles[num - 1].hand, all_tiles[num - 1].facing, all_tiles[num - 1].under_tile_num, all_tiles[num - 1].moving_timer);
        }
        else if (all_tiles[num - 1].class == 'GridMoveEntity') {
            return new GridMoveEntity(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].inv, all_tiles[num - 1].hand, all_tiles[num - 1].facing, all_tiles[num - 1].under_tile_num, all_tiles[num - 1].instructions, all_tiles[num - 1].moving_timer);
        }
        else if (all_tiles[num - 1].class == 'NPC') {
            return new NPC(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].inv, all_tiles[num - 1].hand, all_tiles[num - 1].facing, all_tiles[num - 1].under_tile_num, all_tiles[num - 1].instructions, all_tiles[num - 1].moving_timer);
        }
        else if (all_tiles[num - 1].class == 'Chest'){
            return new Chest(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].inv, all_tiles[num - 1].under_tile_num);
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
            return new Placeable(all_items[num].name, amount, all_items[num].png, all_items[num].price, all_items[num].tile_num, all_items[num].tile_need_num);
        }
    }
    else {
        console.error('item created from ' + num + ' doesnt exist');
    }
}

function mouseReleased() {
    if(!title_screen){
        if(player.looking(currentLevel_x, currentLevel_y) != undefined && player.talking != 0 && player.looking(currentLevel_x, currentLevel_y).class == 'Chest'){
            if(mouseY >= 189 && mouseY <= 457){
                if(mouseX >= 184 && mouseX <= 552){
                    let currentX = min(player.talking.inv[0].length-1, round((mouseX-229)/90))
                    let currentY = min(player.talking.inv.length-1, round((mouseY-234)/90))
                    if(mouse_item == 0 || player.talking.inv[currentY][currentX] == 0){
                        let temp = mouse_item;
                        mouse_item = player.talking.inv[currentY][currentX]
                        player.talking.inv[currentY][currentX] = temp;
                    }
                    else if(player.talking.inv[currentY][currentX].name == mouse_item.name){
                        player.talking.inv[currentY][currentX].amount += mouse_item.amount;
                        mouse_item = 0;
                    }
                    else{
                        let temp = mouse_item;
                        mouse_item = player.talking.inv[currentY][currentX]
                        player.talking.inv[currentY][currentX] = temp;
                    }
                }
            }
            else if(mouseY >= canvasHeight - 64 && mouseY <= canvasHeight){
                if(mouseX >= 113 && mouseX <= 622){
                    let currentX = min(player.inv.length-1, round((mouseX-113)/64))
                    if(mouse_item == 0 || player.inv[currentX] == 0){
                        let temp = mouse_item;
                        mouse_item = player.inv[currentX]
                        player.inv[currentX] = temp;
                    }
                    else if(player.inv[currentX].name == mouse_item.name){
                        player.inv[currentX].amount += mouse_item.amount;
                        mouse_item = 0;
                    }
                    else{
                        let temp = mouse_item;
                        mouse_item = player.inv[currentX]
                        player.talking.inv[currentX] = temp;
                    }
                }
            }
        }
    }
  }