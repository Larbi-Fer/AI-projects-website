'use client'

import Run from './Run'
import { Box, Chip, Container, Grid, Stack, Typography } from '@mui/material'
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import useModelStore from '@store/modelStore';
import '@styles/model.css'
import React, { useEffect } from 'react';

const ModelPage = ({ children, model } : { children: React.ReactNode, model: ModelDetails }) => {
  const { setModel } = useModelStore()
  useEffect(() => {
    setModel(model)
  }, [])
  
  return (
    <div className="model">
        <div className="details">
          <ModelPage.ModelDetail />
        </div>

        <div className="test-section">
          <ModelPage.ModelTest />
        </div>
    </div>
  )
}

function ModelTest() {
  return (
    <Run />
  )
}


function ModelDetail() {
  const {model} = useModelStore()
  if(!model) return 'Loading ...'
  const version = model.versions.length
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>{model?.name}</h1>
        <p>{model?.description}</p>
      </Grid>

      <Grid item xs={12} spacing={2} sx={{ textAlign: "left" }}>


          <Explain title='Model Type'>{ model.type }</Explain>

          <Explain title='Model Version'>{ version }</Explain>

          <Explain title='Model Accuracy'>
            <CircularProgressWithLabel value={model.versions[version - 1].accuracy * 100} />
          </Explain>

          <Explain title='Model Classes'>
              <Stack direction="row" spacing={1}>
                {model.classes.map((c, i) => <Chip label={c} variant="filled" key={i} />)}
              </Stack>
          </Explain>
          
          <Explain title='Model Input Shape'>
            ({((model.inputShape as number[])).map((s, i) => s + ( i == model.inputShape.length-1 ? '' : ', ' ))})
          </Explain>

          <Explain title='Model Output Shape'>{ model.outputShape }</Explain>

          <Explain title='Model Versions'>
              <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }} >
                {model.versions.map((v, i) => <Chip label={v.version} variant="filled" key={i} />)}
              </Stack>
          </Explain>
      </Grid>

    </Grid>
  )
}

ModelPage.ModelTest = ModelTest
ModelPage.ModelDetail = ModelDetail

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const Explain = ({ title, children } : { title: string, children: Readonly<React.ReactNode> }) => {
  return (
    <div className='exp-border'>
      <div className='exp-title'> <h4>{title}</h4> </div>
      <div className='exp-details'>{children} </div>
    </div>
  )
}

export default ModelPage