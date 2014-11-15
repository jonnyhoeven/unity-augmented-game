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
 
 
 // This class needs a textmesh object in the parent container to function properly.
 
	// Setup external classes.
	var myTimeTextMesh : TextMesh;			// Gameobject component for interaction.
	var myTimerEnabled : boolean = false;	// Countdown timerstate.
	
	private var myTimer : float = 0;		// Current time.

	function isActivated(): boolean {		
	// Returns true when timer is counting down.
		return myTimerEnabled;
	}
	
	function GetTime(): float				
	// Returns current time as float.
	{
		return myTimer;
	}


	function StartCounting(TimeValue: float)
	// Enables timer and sets timer in one go.
	{
		myTimer = TimeValue;
		myTimerEnabled = true;
	}

	// Interface SET
	
	// Sets new time.
	function SetTime(newTime: float) 		
	{
		myTimer = newTime;
	}
	
	// Increments time
	function Increment(addTime: float)		
	{
		myTimer += addTime;
	}

	// Start initialize.
	

	function UpdateTimer() {
 		if (myTimer > 0)
		{
 			myTimer -= Time.deltaTime;
 			UpdateMesh();
 		}
 		else if (myTimer < 0)
 		{
			myTimerEnabled = false;
		}
	}
	
	function UpdateMesh()
	{
		try
    	{	
			myTimeTextMesh.text = myTimer.ToString("F0");
		}
		catch (err)
		{
    		Debug.LogError(err.Message);
		}
	}
