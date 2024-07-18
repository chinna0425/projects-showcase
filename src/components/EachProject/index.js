import './index.css'

const EachProject = props => {
  const {eachItem} = props
  const {name, imageUrl} = eachItem
  return (
    <li className="each-list-item">
      <img src={imageUrl} alt={name} className="list-item-image" />
      <p className="list-item-title">{name}</p>
    </li>
  )
}
export default EachProject
