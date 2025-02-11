// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const hexToRgb = (hex: string): [number, number, number] | null => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})(?:[a-f\d]{2})?$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

// https://css-tricks.com/using-javascript-to-adjust-saturation-and-brightness-of-rgb-colors/

const getLowestMiddleHighest = (rgbIntArray: [number, number, number]) => {
    let highest = {val:-1,index:-1};
    let lowest = {val:Infinity,index:-1};

    rgbIntArray.map((val,index)=>{
        if(val>highest.val){
            highest = {val:val,index:index};
        }
        if(val<lowest.val){
            lowest = {val:val,index:index};
        }
    });

    if(lowest.index===highest.index){
        lowest.index=highest.index+1;
    }

    let index = (3 - highest.index - lowest.index);
    let middle = {val: rgbIntArray[index], index: index};
    return [lowest,middle,highest];
}

const multiplyHex = (hex: string, scale: number) => {
    const rgb = hexToRgb(hex);
    const [lowest, middle, highest] = getLowestMiddleHighest(rgb!);

    const returnArray = [];

    returnArray[highest.index] = Math.round(highest.val * scale);
    returnArray[lowest.index] = Math.round(lowest.val * scale);
    returnArray[middle.index] = Math.round(middle.val * scale);

    return `rgb(${[returnArray].join()})`;
}

export const bgColor = (hex: string) => multiplyHex(hex, 0.8);
export const barColor = (hex: string) => multiplyHex(hex, 0.9);
