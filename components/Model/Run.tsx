'use client'

import * as tf from '@tensorflow/tfjs'
import ImageZone from '../tools/ImageZone'
import { useEffect, useState } from 'react'
import { calcAcc, imgPrediction, loadModel } from '@lib/utils'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { Box, Typography } from '@mui/material'
import useModelStore from '@store/modelStore'

const ModelTest = () => {
  const { model: modelDetails, version } = useModelStore()
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [model, setModel] = useState<tf.LayersModel>()
  
  const [fraction, setFraction] = useState(0)
  const [prediction, setPrediction] = useState<Float32Array | null>(null)
  
  useEffect(() => {
    ( async() => {
      if(!modelDetails) return
      const md = await loadModel(modelDetails.url.replace('{version}', '1'), fr => setFraction(fr))
      setTimeout(() => setModel(md), 1000)
    } )()
  }, [modelDetails])

  useEffect(() => {
    if (!imgUrl || !model) return;
    setPrediction(null);
    ( async() => {
      setPrediction(await imgPrediction(modelDetails?.run[0]?.Image!, model, imgUrl))
    } )()
  }, [imgUrl])

  return (
    !model ?
    <Box>
      <h3>{fraction == 1 ? 'Loaded' : 'Loading the model ...'}</h3>
      <LinearProgressWithLabel value={fraction * 100} />
    </Box> :
    <ImageZone setImageUrl={setImgUrl} AboveImage={
      <div>
        <h2> { calcAcc(prediction as Float32Array, modelDetails as ModelDetails) } </h2>
      </div>
    } />
  )
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default ModelTest