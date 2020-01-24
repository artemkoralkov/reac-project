import React from 'react';
import { connect } from 'react-redux';
import FilmsInformation from '../components/FilmsInformation';

class FilmsInformationContainer extends React.PureComponent {
  render() {
    const { clickedFilm } = this.props;
    return <FilmsInformation clickedFilm={clickedFilm} />;
  }
}

const mapStateToProps = store => {
  return {
    clickedFilm: store.films.clickedFilm,
  };
};

export default connect(mapStateToProps)(FilmsInformationContainer);
