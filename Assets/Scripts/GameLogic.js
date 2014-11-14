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
var myCDTimer : CountDownTimer;			// Helper class for countdowntimer.
var myPScore : PlayerScore;				// Helper class for scorekeeping.
var mySplayer : SoundPlayer;			// Helper class for sound playing

var DefaultTimerDuration : float; 		// Duration for each new countdown.
var MaxRanPos : Vector3; 				// Max random position from center when spawning new item.
var MinRanPos : Vector3; 				// Min random position from center when spawning new item.
var PickupPointValue : int; 			// Value in points per pickup.
var PickupTimeValue : int; 				// Amount of time incremented during pickup.
var PickupItemGameObjectTag : String;	// React only to tagged collisions.

// Main loop.
function Update()
{
	try 
	{
		if (myCDTimer.isActivated()) 		// If countdown is running
		{
			myCDTimer.UpdateMesh();			// Update timer textmesh
			mySplayer.CountDownPlaySound(myCDTimer.GetTime());
		}
	}
	catch (err)
{
	Debug.LogError(err.Message);
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
	try
	{
		mySplayer.PickupPlaySound();
		
		DoPickupLogic(Col);
	}		
	catch (err)
	{
		Debug.LogError(err.Message);
	}
}

//runs through pickuplogic
function DoPickupLogic(Col: Collision)
{
	// if timer is active increment points and time.
	if (myCDTimer.isActivated()) 		
	{
		//Increment player score.
		myPScore.Increment(PickupPointValue);
		
		//Increment time.
		myCDTimer.Increment(PickupTimeValue);

	}
	// If timer inactive start new game.
	else
	{								
		// Reset score.
		myPScore.SetScore(PickupPointValue);
									
		// Enable timer for next round.
		myCDTimer.StartCounting(DefaultTimerDuration);
	}

		// move pickup item to new random pos.
		Col.collider.transform.localPosition = NewRandomVector();
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
