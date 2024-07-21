'use client'

import ModelPage from "@components/Model/Page"
import ModelRun from "@components/Model/Run"
import { models } from "@lib/constents"

const Happysad = () => {
  return (
    <div>

    <ModelPage model={models.happysad}>
      {/* <ModelTest /> */}
      <ModelPage.ModelDetail />
      <ModelPage.ModelTest />
    </ModelPage>
    </div>
  )
}

export default Happysad