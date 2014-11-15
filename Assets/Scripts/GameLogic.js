#pragma strict
/*
Author:      Jonny van der Hoeven

  This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 
// External classes.
var myCDTimer : CountDownTimer;			// Helper class countdowntimer.
var myPScore : PlayerScore;				// Helper class for scorekeeping.
var mySplayer : SoundPlayer;			// Helper class for sounds.

var myPUItem : GameObject;				// Gameobject for auto walk transform destination
var myAIChar : GameObject;				// Gameobject for auto walk message

var DefaultTimerDuration : float; 		// Duration for each new countdown.
var MaxRanPos : Vector3; 				// Max random position from center when spawning new item.
var MinRanPos : Vector3; 				// Min random position from center when spawning new item.
var PickupPointValue : int; 			// Value in points per pickup.
var PickupTimeValue : int; 				// Amount of time incremented during pickup.
var PickupItemGameObjectTag : String;	// React only to tagged collisions.
var AutoWalk: boolean ;					// Enable auto targeting on pickup
var LastRandomPos : Vector3;			// Last known radom generated position


// Main loop.
function Update()
{
	if (myCDTimer != null)
	{
		if (myCDTimer.isActivated())
		// If countdown is running.
		{
			// Update timer.
			myCDTimer.UpdateTimer();
			
			if (mySplayer != null)
			{
				mySplayer.CountDownPlaySound(myCDTimer.GetTime());
			}
		}
	}
}

// Main entry for character collisions.
public function HandleCollision(Col :Collision) : void {
	if (Col.collider.tag == PickupItemGameObjectTag) 
	{
			PickeUpItem(Col);
	}
}

function PickeUpItem(Col :Collision) 
{
	// Play pickup sound.
	if (mySplayer != null) {
		mySplayer.PickupPlaySound();
	}		
	DoPickupLogic(Col);
}

// Item pickup game logic.
function DoPickupLogic(Col: Collision)
{
	// generate new position
	LastRandomPos = NewRandomVector();
	// move pickup item to new random pos.
	Col.collider.transform.localPosition = LastRandomPos;

	// check if autowalk is active

	if (AutoWalk)
	{
		DoAutoWalk(Col); //Set target to moved collider
	}

	if (myCDTimer != null && myPScore != null)
	{
		if (myCDTimer.isActivated())
		// if timer is active increment points and time.
		{
			// Increment player score.
			myPScore.Increment(PickupPointValue);
		
			// Increment time.
			myCDTimer.Increment(PickupTimeValue);
		}
		else
		// If timer inactive start new game.
		{								
			// Reset score.
			myPScore.SetScore(PickupPointValue);
									
			// Enable timer for next round.
			myCDTimer.StartCounting(DefaultTimerDuration);
		}
	}
}

		
			
function DoAutoWalk(Col: Collision)
{
	if (myAIChar != null)
	{
		myAIChar.SendMessage("SetTarget",Col.collider.transform);
	}				
}					
			
			
									
// Create random vector3.
function NewRandomVector() : Vector3
{
	var newPos : Vector3;
	newPos = new Vector3(Random.Range(MinRanPos.x,MaxRanPos.x),
 						 Random.Range(MinRanPos.y,MaxRanPos.y),
 						 Random.Range(MinRanPos.z,MaxRanPos.z));
 	return newPos;
}
