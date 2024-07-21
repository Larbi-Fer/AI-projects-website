import * as tf from '@tensorflow/tfjs'
import { createCanvas, loadImage } from 'canvas';

export const convertFileToUrl = (file: Blob) => URL.createObjectURL(file)

export const loadModel = async(
    url: string,
    onProgress?: tf.io.OnProgressCallback | undefined
  ) => {
  const model = await tf.loadLayersModel(url, { onProgress })

  return model
}

export const calcAcc = (prediction: Float32Array, model: ModelDetails) => {
  if (!prediction) return 'Loading...'
  if (model.outputShape[0] == 1) {
    return prediction[0] < 0.5 ? model.classes[0] : model.classes[1]
  }
}

export const imgPrediction = async(runType: ModelRunImage, model: tf.LayersModel, url: string) => {
  const img = await urlToImage( runType, url )
  const data = img.expandDims(0)
  // const data = tf.tensor4d([dataUrl])

  // const resizedTensor = tf.image.resizeBilinear(data, [256, 256]);

  const res = model.predict( data ) as tf.Tensor

  // console.log( res.argMax().dataSync()[0] )
  return await res.data() as Float32Array
}

const urlToImage = (runType: ModelRunImage, url: string) : Promise<tf.Tensor3D | tf.Tensor<tf.Rank>> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      let output : tf.Tensor | tf.Tensor3D;
      output = tf.browser.fromPixels(img);

      output = tf.image.resizeBilinear(output as tf.Tensor3D, runType.dim)

      if (runType.range_0_1) output = output.toFloat().div(tf.scalar(255));
      // Black and White, grayscale
      if (runType.blackAndWite) output = output.toFloat().mean(2).expandDims(2); // 3D tensor with single channel

      resolve(output);
    };

    img.onerror = (err) => {
      reject(err); // Handle errors if the image fails to load
    };
  });
}