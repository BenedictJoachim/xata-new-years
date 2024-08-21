import { ResolutionProp } from "~/routes/resolutions"

interface ResolutionListProps {
    resolution: ResolutionProp;
  }
  
const Resolution = (resolution:ResolutionListProps) => {
    return(
        <p>Resolution {JSON.stringify(resolution)}</p>
    )
}

export default Resolution