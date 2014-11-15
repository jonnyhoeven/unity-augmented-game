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

var MyGameDirectorLogic: GameLogic;

function OnGUI () 
{
	if (MyGameDirectorLogic != null) // if gamedirector available
	{
		if (MyGameDirectorLogic.AutoWalk == true) // if autowalk is active
		{
	    	if (GUI.Button (Rect (40,80,160,40), "Play mode"))
    		{
				MyGameDirectorLogic.AutoWalk = false; //set autowalk to false
				MyGameDirectorLogic.StopAutoWalk();
			}	
		}
		else
		{
    		if (GUI.Button (Rect (40,80,160,40), "Auto mode"))
    		{
				MyGameDirectorLogic.AutoWalk = true; //Set autowalk to true
				MyGameDirectorLogic.DoAutoWalk();
			}
    	}
	}

    // Make the quit button.
    if (GUI.Button (Rect (20,70,80,20), "Exit")) {
        Application.Quit();
    }
}