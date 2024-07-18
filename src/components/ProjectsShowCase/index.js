import {Component} from 'react'
import Loader from 'react-loader-spinner'
import EachProject from '../EachProject'

import './index.css'

const dataMode = {success: 'SUCCESS', failure: 'FAILURE', initial: 'INITIAL'}

class ProjectsShowCase extends Component {
  constructor(props) {
    super(props)
    const {categoriesList} = props
    this.state = {
      categories: categoriesList,
      projectsList: [],
      status: dataMode.initial,
      options: categoriesList[0].id,
    }
  }

  componentDidMount() {
    this.getFetchedData()
  }

  getFetchedData = async () => {
    const {options} = this.state
    const req = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${options}`,
      {method: 'GET'},
    )
    const res = await req.json()
    console.log(req.ok)
    if (req.ok) {
      const converted = res.projects.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))
      this.setState({projectsList: converted, status: dataMode.success})
    } else {
      this.setState({status: dataMode.failure})
    }
  }

  onLoadingData = () => (
    <div data-testid="loader" className="loader-style">
      <Loader type="ThreeDots" color="#328af2" width={50} height={50} />
    </div>
  )

  onSuccessData = () => {
    const {projectsList} = this.state
    return (
      <ul className="unorderd-list-container">
        {projectsList.map(eachItem => (
          <EachProject eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  onFailureData = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-image-setting"
      />
      <h1 className="failure-title">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="failure-retry-button"
        onClick={this.onChangeRetry}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  onRenderItems = () => {
    const {status} = this.state
    switch (status) {
      case dataMode.success:
        return this.onSuccessData()
      case dataMode.failure:
        return this.onFailureData()
      default:
        return this.onLoadingData()
    }
  }

  onChangeValue = event => {
    this.setState({options: event.target.value}, this.getFetchedData)
  }

  onChangeRetry = () => {
    const {options} = this.state
    this.setState({options, status: dataMode.initial}, this.getFetchedData)
  }

  render() {
    const {categories, options} = this.state
    return (
      <div className="projects-main-container">
        <div className="projects-logo-search-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="projects-image-settings"
          />
          <br />
          <select
            value={options}
            className="projects-select-container"
            onChange={this.onChangeValue}
          >
            {categories.map(eachType => (
              <option key={eachType.id} value={eachType.id}>
                {eachType.displayText}
              </option>
            ))}
          </select>
        </div>
        {this.onRenderItems()}
      </div>
    )
  }
}
export default ProjectsShowCase
