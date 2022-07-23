function preload() {


    musicplayer = new MusicPlayer(['audio/Main_theme.wav','audio/calm_dings.mp3','audio/empty_burst.mp3','audio/Main_theme.mp3'])

    //Items
    fullcourse_img = loadImage('images/items/FullCourse.png');

    hoe_img = loadImage('images/items/Hoe.png');
    junk_img = loadImage('images/items/junk.png');
    compost_img = loadImage('images/items/Compost.png');
    sprinkler_img = loadImage('images/items/Sprinkler.png');
    veggy_oil_img = loadImage('images/items/veg_oil.png');
    shovel_img = loadImage('images/items/shovel.png');
    backpack_img = loadImage('images/items/backPack.png');

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
    bridge_tile_var2_img = loadImage('images/tiles/Bridge3.png');
    bridge_tile_var3_img = loadImage('images/tiles/Bridge4.png');
    bridge_tile_2_img = loadImage('images/tiles/BridgeFlip.png');
    bridge_tile_2var_img = loadImage('images/tiles/Bridge2flip.png');
    bridge_tile_2var2_img = loadImage('images/tiles/Bridge3flip.png');
    bridge_tile_2var3_img = loadImage('images/tiles/Bridge4flip.png');
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
    veggy_press_tile_img = loadImage('images/tiles/veg_oil_maker.png');

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

    //robot
    battery_low_img = loadImage('images/ui/batteryIcon.png');

    robot_img = loadImage('images/items/robot.png');
    robot_tile_up_img = loadImage('images/npc/robot_back.png');
    robot_tile_right_img = loadImage('images/npc/robot_right.png');
    robot_tile_down_img = loadImage('images/npc/robot_front.png');
    robot_tile_left_img = loadImage('images/npc/robot_left.png');
    robot_tile_imgs = [[robot_tile_up_img], [robot_tile_right_img], [robot_tile_down_img], [robot_tile_left_img]];

    
    robot_1_img = loadImage('images/items/robot2.png');
    robot_1_tile_up_img = loadImage('images/npc/robot2_back.png');
    robot_1_tile_right_img = loadImage('images/npc/robot2_right.png');
    robot_1_tile_down_img = loadImage('images/npc/robot2.png');
    robot_1_tile_left_img = loadImage('images/npc/robot2_left.png');
    robot_1_tile_imgs = [[robot_1_tile_up_img], [robot_1_tile_right_img], [robot_1_tile_down_img], [robot_1_tile_left_img]];

    
    robot_water_img = loadImage('images/items/robot_water.png');
    robot_water_tile_up_img = loadImage('images/npc/robot_water_back.png');
    robot_water_tile_right_img = loadImage('images/npc/robot_water_right.png');
    robot_water_tile_down_img = loadImage('images/npc/robot_water.png');
    robot_water_tile_left_img = loadImage('images/npc/robot_water_left.png');
    robot_2_tile_imgs = [[robot_water_tile_up_img], [robot_water_tile_right_img], [robot_water_tile_down_img], [robot_water_tile_left_img]];

    //commands
    command_up_img = loadImage('images/items/floppy_up.png');
    command_right_img = loadImage('images/items/floppy_right.png');
    command_down_img = loadImage('images/items/floppy_down.png');
    command_left_img = loadImage('images/items/floppy_left.png');
    command_interact_img = loadImage('images/items/floppy_interact.png');
    command_restart_img = loadImage('images/items/floppy_restart.png');
    command_chest1_img = loadImage('images/items/Floppy_addChestt.png');
    command_chest2_img = loadImage('images/items/floppy_removechest.png');
    command_pause_img = loadImage('images/items/Floppy_Pause.png');

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
    //letuce
    letuce_tile_img = loadImage("images/tiles/lettuce_3.png");

    //watermelon
    watermelon_img = loadImage("images/items/watermelon2.png");
    watermelon_seed_bag_img = loadImage("images/items/seedbagwatermelon.png");
    watermelon_tile_2_img = loadImage("images/tiles/watermelon_4.png");
    watermelon_tile_3_img = loadImage("images/tiles/watermelon_5.png");
    watermelon_tile_4_img = loadImage("images/tiles/watermelon_6.png");
    watermelon_tile_imgs = [letuce_tile_img, watermelon_tile_2_img, watermelon_tile_3_img, watermelon_tile_4_img];

    //hemp
    
    hemp_img = loadImage("images/items/hemp.png");
    hemp_tile_1_img = loadImage("images/tiles/hemp_1.png");
    hemp_tile_3_img = loadImage("images/tiles/hemp_3.png");
    hemp_tile_4_img = loadImage("images/tiles/hemp_4.png");
    hemp_tile_5_img = loadImage("images/tiles/hemp_5.png");
    hemp_tile_6_img = loadImage("images/tiles/hemp_6.png");
    hemp_seed_img = loadImage("images/items/hemp_seeds.png");
    hemp_tile_imgs = [hemp_tile_1_img, hemp_tile_3_img, hemp_tile_4_img,hemp_tile_5_img,hemp_tile_6_img];


    // ladybugs
    ladybug_bag_img = loadImage("images/items/Lady_Bug_bag.png");
    ladybug_img = loadImage("images/tiles/LadyBugs.gif");

    //bees
    bee_img = loadImage("images/tiles/Bees.gif");
    bee_imgs = [[bee_img], [bee_img], [bee_img], [bee_img]];

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
    fore_empty_img = loadImage('images/foreground/building_empty.png');
    fore_cloud_img = loadImage('images/foreground/Cloud_Tile.png');
    fore_cloud_2_img = loadImage('images/foreground/cloud_tile2.png');
    fore_building_img = loadImage('images/foreground/Building_Low.png');
    fore_red_building_img = loadImage('images/foreground/Red_building_low.png');
    fore_red_grown_building_img = loadImage('images/foreground/red_building_low2.png');
    fore_gray_building_img = loadImage('images/foreground/building_gray.png');

    /*
    class           obj
    Tile            { name: 'name', png: [png_img], border: true, collide: false, age: -1, class: 'Tile' }
    Shop            { name: 'name', png: png_img, inv: [], class: 'Shop'}
    Plant           { name: 'name', png: png_img, border: true, collide: false, age: 0, eat_num: 0, waterneed: 0, growthTime: 0, class: 'Plant' }  2000 growthTime is about 1 day
    Entity          { name: 'name', png: png_img, border: true, collide: false, age: -1, inv: [0, {num: 1, amount: 1}], hand: 0, under_tile_num: 0, class: 'Entity' }
    FreeMoveEntity  { name: 'name', png: png_img, inv:[0, {num: 1, amount: 1}], under_tile_num: 0, instructions: [], moving_timer: 0, class: 'FreeMoveEntity' }
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
    /*8*/    { name: 'bridge', png: [bridge_tile_img, bridge_tile_var_img, bridge_tile_var2_img, bridge_tile_var3_img], border: false, collide: false, age: -1, class: 'Tile' },
    /*9*/    { name: 'bridge2', png: [bridge_tile_2_img, bridge_tile_2var_img, bridge_tile_2var2_img, bridge_tile_2var3_img], border: true, collide: false, age: -1, class: 'Tile' },
    /*10*/    { name: 'satilite', png: [satilite_tile_img], border: true, collide: true, age: -1, class: 'Tile' },
    /*11*/    { name: 'solarpanel', png: [solarpanel_tile_img], border: true, collide: true, age: -1, class: 'Tile' },
    /*12*/    { name: 'lamppost', png: [lamppost_tile_img], border: true, collide: true, age: -1, class: 'Tile' },
    /*13*/    { name: 'compost_tile', png: [compost_tile_img], border: true, collide: false, age: 0, class: 'Tile' },
    /*14*/    { name: 'compost_bucket', png: [compost_bucket_tile_img], border: true, collide: false, age: -1, class: 'Tile' },
    /*15*/    { name: 'cart_s', png: [cart_s_tile_img], border: true, collide: true, age: -1, class: 'Tile' },
    /*16*/    { name: 'Vegitables', png: [cart_tile_img, cart_sp_tile_img], inv: [{ num: 2, amount: 7}, {num: 5, amount: 6}], class: 'Shop' },
    /*17*/    { name: 'Ladybugs and Flowers', png: [cart_ladybug_tile_img, cart_flower_tile_img], inv: [{num: 10, amount: 6}, {num: 11, amount: 6}], class: 'Shop' },
    /*18*/    { name: 'Sprinklers', png: [cart_sprinkler_tile_img], inv: [{num: 12, amount: 6}], class: 'Shop' },
    /*19*/    { name: 'Veggy Seeds', png: [cart_tile_img, cart_sp_tile_img], inv: [{ num: 3, amount: 7}, {num: 6, amount: 6}], class: 'Shop' },
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
    /*40*/    { name: 'chest', png: chest_img, inv: [0, { num: 23, amount: 2}, { num: 26, amount: 1}, { num: 29, amount: 1}, { num: 30, amount: 1}, 0, 0, 0, 0, 0, 0, { num: 4, amount: 2}], facing: 2, under_tile_num: 1, class: 'Chest'},
    /*41*/    { name: 'watermelon', png: watermelon_tile_imgs, border: true, collide: false, age: 0, eat_num: 17, waterneed: 2, growthTime: 4000, class: 'Plant'},
    /*42*/    { name: 'Robot3', png: robot_tile_imgs, inv: [0, 0, 0, 0, 0, 0, 0], under_tile_num: 1, instructions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], moving_timer: 60, class: 'Robot'},
    /*43*/    { name: 'Fruis', png: [cart_straw_tile_img], inv: [{num: 7, amount: 3}, {num: 15, amount: 3}, {num: 17, amount: 3}], class: 'Shop' },
    /*44*/    { name: 'Fruit Seeds', png: [cart_straw_tile_img], inv: [{num: 8, amount: 4}, {num: 14, amount: 2}, {num: 16, amount: 1}], class: 'Shop' },
    /*45*/    { name: 'hemp', png: hemp_tile_imgs, border: true, collide: false, age: 0, eat_num: 25, waterneed: 2, growthTime: 2000, class: 'Plant'},
    /*46*/    { name: 'Robot1', png: robot_1_tile_imgs, inv: [0, 0, 0, 0], under_tile_num: 1, instructions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], moving_timer: 100, class: 'Robot'},
    /*47*/    { name: 'Robot2', png: robot_2_tile_imgs, inv: [0, 0, 0, 0, 0, 0], under_tile_num: 1, instructions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], moving_timer: 80, class: 'Robot'},
    /*48*/    { name: 'Veggie_Press', png: [veggy_press_tile_img], border: true, collide: false, age: -1, class: 'Tile' },
    /*49*/    { name: 'Bees', png: bee_imgs, inv:[0], under_tile_num: 0, instructions: [], moving_timer: 50, class: 'FreeMoveEntity' },
    /*50*/    { name: 'Flower_Done', png: [flower_tile_img2], border: true, collide: false, age: 0, class: 'Tile'}
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
        /*15*/{name: 'Tomato', png: tomato_img, price: 3, hunger: 1, hunger_timer: 1800, seed_num: 14, class: 'Eat'},
        /*16*/{name: 'Watermelon Seed', png: watermelon_seed_bag_img, plant_num: 41, class: 'Seed'},
        /*17*/{name: 'Watermelon', png: watermelon_img, price: 8, hunger: 2, hunger_timer: 2000, seed_num: 16, class: 'Eat'},
        /*18*/{name: 'Robot3', png: robot_img, price: 80, tile_num: 42, tile_need_num: 0, class: 'Placeable'},
        /*19*/{name: 'Up Command', png: command_up_img, command: 'up', class: 'Command'},
        /*20*/{name: 'Right Command', png: command_right_img, command: 'right', class: 'Command'},
        /*21*/{name: 'Down Command', png: command_down_img, command: 'down', class: 'Command'},
        /*22*/{name: 'Left Command', png: command_left_img, command: 'left', class: 'Command'},
        /*23*/{name: 'Interact Command', png: command_interact_img, command: 'interact', class: 'Command'},
        /*24*/{name: 'Hemp Seed', png: hemp_seed_img, plant_num: 45, class: 'Seed'},
        /*25*/{name: 'Hemp Flower', png: hemp_img, price: 20, hunger: -2, hunger_timer: 100, seed_num: 24, class: 'Eat'},
        /*26*/{name: 'Restart Command', png: command_restart_img, command: 'restart', class: 'Command'},
        /*27*/{name: 'Robot1', png: robot_1_img, price: 60, tile_num: 46, tile_need_num: 0, class: 'Placeable'},
        /*28*/{name: 'Robot2', png: robot_water_img, price: 70, tile_num: 47, tile_need_num: 0, class: 'Placeable'},
        /*29*/{name: 'Add to Chest Command', png: command_chest1_img, command: 'add_to_chest', class: 'Command'},
        /*30*/{name: 'Add from Chest Command', png: command_chest2_img, command: 'add_from_chest', class: 'Command'},
        /*31*/{name: 'Veggy Oil', png: veggy_oil_img, price: 7, class: 'Item'},
        /*32*/{name: 'Shovel', png: shovel_img, class: 'Tool'},
        /*33*/{name: 'Backpack', png: backpack_img, inv: [0, { num: 23, amount: 2}, { num: 26, amount: 1}, { num: 29, amount: 1}, { num: 30, amount: 1}, {num: 27, amount: 3}, {num: 19, amount: 4}, {num: 20, amount: 4}, {num: 21, amount: 4}, {num: 22, amount: 4}, 0, { num: 34, amount: 2}], class: 'Backpack'},
        /*34*/{name: '1 Day Pause Command', png: command_pause_img, command: '1day_pause', class: 'Command'}
    ];
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i < cloudCount; i++) {
        clouds[i] = new Cloud()
    }
    
    player = new Player('player1', player_imgs, (5 * tileSize), (5 * tileSize));

    startButton = createButton('Start');
    startButton.position(canvasWidth/2-250/2, canvasHeight/2+120);
    startButton.mousePressed(start);
    startButton.style('width', '250px');
    startButton.style('background','url()');
    startButton.style("font-family","pixelFont");
    
    optionsButton = createButton('Options');
    optionsButton.position(canvasWidth/2-250/2, canvasHeight/2+160);
    optionsButton.mousePressed(() => {
        paused = !paused;
        creditsOn = false;
    });
    optionsButton.style('width', '250px');
    optionsButton.style('background','url()');
    optionsButton.style("font-family","pixelFont");

    creditsButton = createButton('Credits');
    creditsButton.position(canvasWidth/2-250/2, canvasHeight/2+200);
    creditsButton.mousePressed(() => {
        creditsOn = !creditsOn;
        paused = false;
    });
    creditsButton.style('width', '250px');
    creditsButton.style('background','url()');
    creditsButton.style("font-family","pixelFont");

    robotPlayButton = createButton('Play');
    robotPlayButton.position(((11*canvasWidth)/16) - 55, canvasHeight/8 - 5);
    robotPlayButton.mousePressed(() => {
        temp_move_bool = true;
    });
    robotPlayButton.style("font-family","pixelFont");
    robotPlayButton.style('background-color','rgb(100, 100, 100)');
    robotPlayButton.style('color','rgb(0, 255, 0)');
    robotPlayButton.hide();

    robotPauseButton = createButton('Pause');
    robotPauseButton.position(((11*canvasWidth)/16) + 19, canvasHeight/8 - 5);
    robotPauseButton.mousePressed(() => {
        temp_move_bool = false;
    });
    robotPauseButton.style("font-family","pixelFont");
    robotPauseButton.style('background-color','rgb(100, 100, 100)');
    robotPauseButton.style('color','rgb(0, 0, 255)');
    robotPauseButton.hide();

    robotBoomButton = createButton('Boom');
    robotBoomButton.position(((14*canvasWidth)/16) - 30, canvasHeight/8 - 5);
    robotBoomButton.mousePressed(() => {
        if(checkForSpace(player, item_name_to_num(player.looking(currentLevel_x, currentLevel_y).name))){
            addItem(player, item_name_to_num(player.looking(currentLevel_x, currentLevel_y).name), 1);
            if (player.touching != 0) {
                levels[currentLevel_y][currentLevel_x].map[(player.looking(currentLevel_x, currentLevel_y).pos.y / tileSize)][player.looking(currentLevel_x, currentLevel_y).pos.x / tileSize] = player.looking(currentLevel_x, currentLevel_y).under_tile;
            }
            robotPlayButton.hide();
            robotPauseButton.hide();
            robotBoomButton.hide();
            player.talking = 0;
        }
    });
    robotBoomButton.style("font-family","pixelFont");
    robotBoomButton.style('background-color','rgb(100, 100, 100)');
    robotBoomButton.style('color','rgb(255, 0, 0)');
    robotBoomButton.hide();

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
        [8, 8, 1, 6, 6, 6, 6, 1, 1, 1, 48, 1, 1, 1, 1, 1, 1, 1, 10, 1, 0, 0, 0], 
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
        [0, 0, 0, 1, 1, 12, 1, 1, 1, 43, 1, 1, 1, 44, 1, 1, 1, 1, 1, 0, 0, 0, 0], 
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