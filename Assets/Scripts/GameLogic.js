#pragma strict



var MyDurationTime: float; 
var MyPickupPointValue: int;
var MyPickupTimeValue: int;
var MyMaxPos : Vector3 = Vector3.zero;
var MyMinPos : Vector3 = Vector3.zero;
var FirstPickupPos : Vector3;
var MyAICollision: AICharacterCollision;

private var MyPlayerScore: int = 0;
private var MyTimerEnabled: boolean = false;

private var MyTimeMesh: TextMesh;
private var MyScoreMesh: TextMesh;
private var MyTimer: float = MyDurationTime; 


function Start () {
	// Connect to characters:
	MyTimeMesh = GameObject.Find("TimeText").GetComponent(TextMesh);	
	MyScoreMesh = GameObject.Find("ScoreText").GetComponent(TextMesh);
	MyAICollision = GameObject.Find("AI Character").GetComponent("AICharacterCollision");
}

function Update(){
	
	//if timer enabled start counting down.
	if (MyTimerEnabled) {
 		MyTimer -= Time.deltaTime;
		
		//change game state based on timer
		CheckTimerState();
		UpdateTimeMeshText();
	}
}

//Check for state changes during countdown
function CheckTimerState(): void {
	if (MyTimer > 3) {	//do nothing
		return; 
	} else if (MyTimer > 3 && MyTimer < 3.1){ // alert player
		PlaySound("TimeAlertSound");
  	} else if (MyTimer > 2 && MyTimer < 2.1){ // alert player
		PlaySound("TimeAlertSound");
  	} else if (MyTimer > 1 && MyTimer < 1.1){ // alert player
		PlaySound("TimeAlertSound");
  	} else if (MyTimer < 0){
  		// game over, stop timer and wait for another collision
		PlaySound("GameOverSound");
		TimerEnabled(false);
	}
}

//timer interfaces
function UpdateTimeMeshText(): void {
	MyTimeMesh.text = MyTimer.ToString("F0");
}
function TimerEnabled(TState: boolean): void {
	MyTimerEnabled = TState;
	UpdateTimeMeshText();
}
public function UpdateTimer(plTime: float): void {
	MyTimer = plTime;
	UpdateTimeMeshText();
}
function IncrementTimer(plTime: float): void {
	MyTimer += plTime;
	UpdateTimeMeshText();
}

//score interfaces
function UpdateScoreMeshText(tString : String): void {
	MyScoreMesh.text = tString;
}
function UpdatePlayerScore(plScore: int) {
	MyPlayerScore = plScore;
	UpdateScoreMeshText(MyPlayerScore.ToString());
}
function IncrementPlayerScore(plScore: int) {
	MyPlayerScore += plScore;
	UpdateScoreMeshText(MyPlayerScore.ToString());
}

//random position generator for itemdrop
public function GetRandomPosisionWithinBounds() {
	var newPos : Vector3 = new Vector3(Random.Range(MyMinPos.x,MyMaxPos.x),
 	Random.Range(MyMinPos.y,MyMaxPos.y),
 	Random.Range(MyMinPos.z,MyMaxPos.z));
 	return newPos;
}

//Main Entry for character collisions
public function HandleCollision(Col :Collision):void {
	if (Col.collider.name == "PickupItem") {
			PickeUpItem(Col);
	}
}
//Item pickup game logic
function PickeUpItem(Col :Collision) {
	// play pickup sound
		PlaySound("PickUpSound");
	
	// if timer is active increment points and time
	if (MyTimerEnabled) {
		// move collider pickupitem to random pos
		
		Col.collider.transform.localPosition = GetRandomPosisionWithinBounds();

		//Increment player score, time
		IncrementPlayerScore(MyPickupPointValue);
		IncrementTimer(MyPickupTimeValue);
	}
	// If timer inactive  start new game
	else{
		// reset collider pickupitem to first pickup position
		Col.collider.transform.localPosition = FirstPickupPos;

		// clear points, reset time
		// and enable timer for next round.
		UpdatePlayerScore(MyPickupPointValue);
		UpdateTimer(MyDurationTime);
		TimerEnabled(true);
	}
}

function PlaySound(SName : String) : void {
	var MyAudioSource: AudioSource;
	
	MyAudioSource = GameObject.Find(SName).GetComponent(AudioSource);
	
	if (!MyAudioSource.isPlaying){
		MyAudioSource.Play();
	}
}