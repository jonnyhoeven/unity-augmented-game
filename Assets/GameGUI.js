#pragma strict
var MyGameDirectorLogic: GameLogic;

function OnGUI () 
{
    // Make a background box
    GUI.Box (Rect (10,10,100,90), "JH");


	if (MyGameDirectorLogic != null) // if gamedirector available
	{
		if (MyGameDirectorLogic.AutoWalk)
		{
	    	if (GUI.Button (Rect (20,40,80,20), "Play mode"))
    		{
				MyGameDirectorLogic.AutoWalk = false; //set autowalk to false
			}	
		}
		else
		{
    		if (GUI.Button (Rect (20,40,80,20), "Auto mode"))
    		{
				MyGameDirectorLogic.AutoWalk = true; //Set autowalk to true
			}
    	}
	}

    // Make the quit button.
    if (GUI.Button (Rect (20,70,80,20), "Exit")) {
        Application.Quit();
    }
}