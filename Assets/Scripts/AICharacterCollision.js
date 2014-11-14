#pragma strict

private var MyGameLogic: GameLogic;

// get interface to gamelogic
function Start ()
{
	MyGameLogic = GameObject.Find("GameDirector").GetComponent(GameLogic);
}
    
//Handle collision, check if pickupitem, call gamelogic
function OnCollisionEnter(Col : Collision)
{
		MyGameLogic.HandleCollision(Col);
}

