import React, { Component } from 'react';
import './App.module.css';
import { fetchImages, PER_PAGE } from '../services/api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { toast } from 'react-toastify';



export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
    error: null,
    showModal: false,
    largeImage: '',
    currentImgPerPage: null,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    if (prevQuery !== nextQuery) {
      this.getImagesData();
    }

    if (this.state.page > 2) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  handleFormSubmit = query => {
    this.setState(() => {
      return { query: query, page: 1, images: [] };
    });
  };

  handleLoadMoreImg = () => {
    this.getImagesData();
  };

  getImagesData = async () => {
    try {
      this.setState({ loading: true });
      const { hits, totalHits } = await fetchImages(
        this.state.page,
        this.state.query
      );
      if (totalHits === 0) {
        toast.error('Images not found ...');
        this.setState({ loading: false, currentImgPerPage: null });
        return;
      }

      const images = this.imagesArray(hits);

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...images],
          currentImgPerPage: hits.length,
          page: prevState.page + 1,
        };
      });
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  imagesArray = data => {
    return data.map(({ id, largeImageURL, tags, webformatURL }) => {
      return { id, largeImageURL, tags, webformatURL };
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  openModal = largeImage => {
    this.setState({ largeImage }, () => {
      this.toggleModal();
    });
  };

  render() {
    const { images, loading, currentImgPerPage, error, showModal, largeImage } =
      this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && !error && (
          <>
            <ImageGallery images={images} onClick={this.openModal} />
            {currentImgPerPage && currentImgPerPage < PER_PAGE && (
              <p className="Message">No more pictures</p>
            )}
          </>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt="" />
          </Modal>
        )}
        {currentImgPerPage === PER_PAGE && !loading && (
          <Button onClick={this.handleLoadMoreImg} />
        )}
        {loading && <Loader />}
      </div>
    );
  }
}