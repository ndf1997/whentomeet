import React, { useState } from 'react';
import PollingComponent from './PollingComponent';

function PollingDisplay(){

    //data containing answers
    const initialArray: Array<any> = [ 
        {value: 'A', count: 0, selected: false},
        {value: 'B', count: 0, selected: false},
        {value: 'C', count: 0, selected: false},
        {value: 'D', count: 0, selected: false},
         ];

    const [Answers, setAnswers] = useState(initialArray);
    
    function handleIncrement(value: string) {
        const temp = [...Answers];
        const index = temp.findIndex(answer => answer.value === value);
        temp[index].count++;
        for(let i=0; i<temp.length; i++){
            if(temp[i].selected){
                temp[i].count--;
                temp[i].selected = false;
                break;
            }
        }
        temp[index].selected = true;
        setAnswers(temp);
        console.log('incremented')
    }
    
    return(
        <div>
            {Answers.map(component => (
                <PollingComponent
                onIncrement={handleIncrement} 
                value={component.value}
                count={component.count}
                />
            ))}    
        </div>
    ); 
}

export default PollingDisplay;
