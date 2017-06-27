//variaveis
var x = 100;
var y = 440;
var yo;
var disparo = false
var xd;
var yd = 490;
var v = 5;
var p = 0;
var n = 1;
var ani = 0;
var Vxo = [];
var qtO = 3;
var Bob = [];
var bobA;
var aux = 0;
var vo = 3;
var start = true;
var inicial;
var aguaViva;
var gameOver;
var final = false;
var bolha;
var cenario;
var vencer = false;
var congratulations;
var r = 0, g = 0, b = 200; //cor do "céu"
var pulo = false;
var pu=0;
var t=0
//adicionar imagem
function preload() {
  Bob = [loadImage("Bob1.png"), loadImage("Bob0.png")];
  inicial = loadImage("tela1.png");
  aguaViva = loadImage("aguaViva.png");
  gameOver = loadImage("gameOver.png");
  bolha = loadImage("bolha.png");
  cenario = loadImage("cenario.png");
  congratulations = loadImage("congratulations.gif");
}

function setup() {

  background(r, g, b);
  image(cenario, 0, 0, 1300, 600);
  createCanvas(1300, 600);
  yo = 500
  //vários obstáculos
  for (i = 0; i < qtO; i++) {
    Vxo[i] = random(800, width);
  }
}

// os códigos de "draw" executam constantemente
function draw() {
  background(r, g, b);
  image(cenario, 0, 0, 1300, 600);

  //imagem do bob esponja
  bobA = image(Bob[ani], x, y+pu, 160, 160);
  //aguaViva
  for (i = 0; i < qtO; i++) {
    image(aguaViva, Vxo[i], yo, 70, 70);
    Vxo[i] = Vxo[i] - vo;
  }
  //aparecer texto na tela
  textSize(32);
  fill(0, 255, 255);
  text("Vidas:" + v, 10, 30);
  fill(0, 255, 255);
  text("Pontuação: " + p, 10, 60);
  fill(0, 255, 255);
  text("Nível: " + n, 10, 90);
  //colisão entre obstáculo e personagem
  for (i = 0; i < qtO; i++) {
    if(dist(x, y+pu, Vxo[i], yo)<70) {
      v = v - 1;
      x = 100;
      Vxo[i] = random(width, 3 * width)
    }
  }
  //colisão entre disparo e obstáculo
  for (i = 0; i < qtO; i++) {
    if(dist(xd, yd, Vxo[i], yo)<41){
      disparo = false
      p = p + 10;
      aux = aux + 10;
      Vxo[i] = random(width, 5 * width);
      xd = width * 5;
    }
  }
  if (xd > 1300) {
    xd = width * 5;
  }
  //pulo
    if(pulo==true){
    pu = t*(t-35);
    t = t+1;
      if(t>35){
        pu = 0;
        pulo = false;
        t = 0;
      }
    }
    if(keyIsDown(UP_ARROW) && pulo==false){
		pulo = true;
	}
  //movimentação do personagem
  if (keyIsDown(LEFT_ARROW)) {
    x = x - 10;
    print( "esquerda: "+ani);
    if (ani==0){ //animaçao
      ani = 1;
      bobA = image(Bob[ani], x, y, 160, 160);
    } else if (ani == 1) {
      ani = 0;
      bobA = image(Bob[ani], x, y, 160, 160);
    }
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    x = x + 5;
    if (ani == 0){  //animaçao
      ani = 1;
      bobA = image(Bob[ani], x, y, 160, 160);
    } else if (ani == 1){
      ani = 0;
      bobA = image(Bob[ani], x, y, 160, 160);
    }
  }
  //reaparecimento do obstáculo
  for (i = 0; i < qtO; i++) {
    if (Vxo[i] < 0) {
      Vxo[i] = random(width, width + 500);

    }
  }
  //disparo
  if (keyIsDown(32) && disparo == false) {
    disparo = true;
    xd = x;
  }
  if (x < 40) {
    x = 40
  }
  if (x > 1260) {
    x = 1260;
  }
  if (disparo == true) {
    xd = xd + 10;
  }
  if (xd > 1300) {
    disparo = false;
  }
  //Mudança de níveis
  if (aux >= 100) {
    vo = vo + 2;
    n = n + 1;
    qtO = qtO + 1;
    aux = 0;
    b = b - 40;
  }
  image(bolha, xd, yd, 30, 30);


  if (start == true) {
    //imagem inicial
    image(inicial, 0, 0, 1300, 600);

  }
  //Game Over
  if (v <= 0) {
    final = true;

  }
  if (final == true) {
    image(gameOver, 0, 0, 1300, 600);
  }
  //Restart
  if (final == true && keyIsDown(13)) {
    final = false;
    v = 5;
    p = 0;
    n = 1;
    qtO = 3;
    aux = 0;
    textSize(40);
    if (Vxo[i] < 0) {
      Vxo[i] = random(width, width + 500);
    }
  }
  //fim do jogo
  if (n >= 6) {
    vencer = true;
  }
  if (vencer == true) {
    image(congratulations, 0, 0, 1300, 600);
  }
  if (keyIsDown(13) && start == true) {

    start = false;
    v = 5;
    p = 0;
    n = 1;
    qtO = 3;
    aux = 0;
    textSize(40);
    if (Vxo[i] < 0) {
      Vxo[i] = random(width, width + 500);

    }
  }

}
