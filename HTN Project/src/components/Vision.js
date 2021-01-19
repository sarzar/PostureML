import * as cvstfjs from '@microsoft/customvision-tfjs';
import * as data from './models/model.json'

async function run() {
    
    const model = new cvstfjs.ObjectDetectionModel();
    
    console.log("Object data" , data);
    const image = document.getElementById("image");
    
    await model.loadModelAsync('./models/model.json');
    
    const result = await model.executeAsync(image);
    
    alert(result)
    let detected_boxes, detected_scores, detected_classes;
    [detected_boxes, detected_scores, detected_classes] = result;

    //alert("Label: " + detected_boxes[0] + "prob: " + detected_scores[0].toFixed(2));

    console.log(detected_scores)
    console.log(detected_classes)

    let chances = new Array(5).fill(0);
    const postures = ['Reclined back', 'Forward hunching', 'Good posture', 'Resting head on hand', 'Head tilted'];
    let mp = new Map();
    for (let i = 0; i < detected_classes.length; i++) {
        chances[detected_classes[i]] += detected_scores[i];
    }
    let cnt = 0;
    let mx = 0;
    let txt = "";
    for (let i = 0; i < chances.length; i++) {
        cnt += chances[i];
        if (mx < chances[i]) {
            mx = chances[i];
            txt = postures[i];
        }
        mp.set(postures[i], chances[i]);
    }
    console.log(mp);
    console.log(cnt);
    console.log(mx + " : " + txt);


    return txt;

}

export default run