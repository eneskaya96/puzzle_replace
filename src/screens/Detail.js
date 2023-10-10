import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Draggable from 'react-native-draggable';
import { images } from './Home';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const numRows = 5;
const numCols = 4;

const imageWidth = windowWidth / numCols;
const imageHeight = windowHeight * 0.1;

const initialImages = Array.from({ length: numRows * numCols }).map((_, index) => ({
  index,
  source: images[index].source, 
  x: 0,
  y: 0
}));

export default function DetailScreen() {
  const [sortedImages, setSortedImages] = useState(initialImages);
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    const newSortedImages = [...sortedImages];
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      for (let colIndex = 0; colIndex < numCols; colIndex++) {
        let index = (rowIndex * numCols) + colIndex
        newSortedImages[index].x = colIndex  * imageWidth 
        newSortedImages[index].y = rowIndex * imageHeight
      }
    }
    setSortedImages(newSortedImages);
  }, []); 

  /*
  console.log("-----")
  for (let i = 0; i < sortedImages.length; i++) {
    console.log("sortedImages", sortedImages[i])
  }
  console.log("-----")
  //console.log("imagePositions", imagePositions)
  */

  const handleOnDrag = (draggingIndex, gestureState) => {
    setDragging(draggingIndex);
  };

  const findTargetImageIndex = (x, y) => {

    for (let i = 0; i < sortedImages.length; i++) {
      const isInXRange = x >= sortedImages[i].x && x < sortedImages[i].x + imageWidth;
      const isInYRange = y >= sortedImages[i].y && y < sortedImages[i].y + 2 * imageHeight;
      if (isInXRange && isInYRange) {
        return i;
      }
    }
    return -1;
  };


  const handleDrop = (droppedIndex, gestureState) => {
    setDragging(null);
    
    const { moveX, moveY, dx, dy } = gestureState;
    const targetIndex = findTargetImageIndex(moveX, moveY);

    console.log("droppedIndex", droppedIndex)
    console.log("targetIndex", targetIndex)

    if(targetIndex === droppedIndex ){
      console.log("OLAAAAA")
      const droppedImaged = sortedImages[droppedIndex];
      
      setSortedImages(prevImages => [...prevImages]);
    }
    else if (targetIndex !== -1 ) {
      const newSortedImages = [...sortedImages];

      const droppedImaged = sortedImages[droppedIndex];
      const targetImaged = sortedImages[targetIndex];
      

      let tempX = droppedImaged.x;
      let tempY = droppedImaged.y;


      droppedImaged.x = targetImaged.x 
      droppedImaged.y = targetImaged.y 

      targetImaged.x = tempX
      targetImaged.y = tempY

      setSortedImages(newSortedImages);
      
    }
    
  };

  const renderOrder = [...sortedImages].sort((a, b) => {
    if (a.index === dragging) return 1; // sürüklenen öğeyi sona koy
    if (b.index === dragging) return -1; // sürüklenen öğeyi sona koy
    return 0; // diğer durumda sıralama değişikliği yapma
  });

  return (
    <View style={styles.container}>
      {renderOrder.map((image) => (
        <Draggable
          key={`draggable_${image.index}${image.x}${image.y}`}
          x={image.x}
          y={image.y}
          onDrag={(event, gestureState) => handleOnDrag(image.index, gestureState)}
          onDragRelease={(event, gestureState) => handleDrop(image.index, gestureState)}
        >
          <Image key={`image_${image.index}`} source={image.source} style={[styles.image, dragging === image.index && styles.dragging]} />
        </Draggable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: windowWidth,
    height: windowHeight * 0.8,
  },
  dragging: {
    transform: [{ scale: 1.1 }],
    zIndex: 3,
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    zIndex: -1,
  },
});
