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
 
// This class keeps score
public var myScoreTextMesh: TextMesh;
private var myPlayerScore: int = 0;

//score interfaces
function SetScore(plScore: int) 
{
	myPlayerScore = plScore;
	UpdateMesh();
}

function Increment(plScore: int) 
{
	myPlayerScore += plScore;
	UpdateMesh();
}

function ResetScore() 
{
	myPlayerScore = 0;
	UpdateMesh();
}

function UpdateMesh()
{
	try
	{
		myScoreTextMesh.text = myPlayerScore.ToString();
	}
	catch (err)
	{
		Debug.LogError(err.Message);
	}	
}

