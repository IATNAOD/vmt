import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';

import languagesTranslate from '../../common/languages'

import { addNewLoader, editCurrentLoader, deleteCurrentLoader } from '../../store/actions/loaders.actions'

import AddLoaderComponent from '../AddLoader'
import EditLoaderComponent from '../EditLoader'

export default connect((s) => ({
  user: s.user.state,
  loaders: s.loader.state,

}), {
  addNewLoader,
  editCurrentLoader,
  deleteCurrentLoader
})(
  ({
    CurrentLanguage_G,

    user,
    loaders,

    addNewLoader,
    editCurrentLoader,
    deleteCurrentLoader
  }) => {
    const [AddLoaderOpen, changeAddLoaderOpen] = useState(false)
    const [EditLoaderOpen, changeEditLoaderOpen] = useState(false)
    const [CurrentLoader, changeCurrentLoader] = useState(false)
    const [CurrentPage, changeCurrentPage] = useState(1)

    const editLoader = (mark) => {
      changeCurrentLoader(mark)
      changeEditLoaderOpen(true)
    }

    const handlePageChange = (page) => {
      changeCurrentPage(page);
    }

    return (
      <section className="content">
        {
          AddLoaderOpen
            ? <AddLoaderComponent
              CurrentLanguage_G={CurrentLanguage_G}
              user={user}
              loaders={loaders}
              addNewLoader={addNewLoader}
              onOutsideClick={() => changeAddLoaderOpen(false)}
            />
            : null
        }
        {
          EditLoaderOpen
            ? <EditLoaderComponent
              CurrentLanguage_G={CurrentLanguage_G}
              user={user}
              loaders={loaders}
              CurrentLoader={CurrentLoader}
              editCurrentLoader={editCurrentLoader}
              deleteCurrentLoader={deleteCurrentLoader}
              onOutsideClick={() => changeEditLoaderOpen(false)}
            />
            : null
        }
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].loaderPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].loaderPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].loaderPage.pathItem2}</li>
                </ul>
                <button className="btn btn-primary btn-icon mobile_menu" type="button"><i
                  className="zmdi zmdi-sort-amount-desc"></i></button>
              </div>
            </div>
          </div>

          <div class="container-fluid">
            <div class="row clearfix">
              <div class="col-lg-12 col-md-12">
                <div class="card">
                  <div class="header">
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].loaderPage.loader}</strong></h2>
                  </div>
                  <div class="body">
                    <div className="w-100 d-flex justify-content-end mb-2">
                      <button onClick={() => changeAddLoaderOpen(true)} class="btn btn-outline-secondary p-2" type="button">+ {languagesTranslate[CurrentLanguage_G].loaderPage.addLoaderButton}</button>
                    </div>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>{languagesTranslate[CurrentLanguage_G].loaderPage.id}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].loaderPage.name}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].loaderPage.link}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].loaderPage.startCount}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          loaders.map((v, i) =>
                            i < CurrentPage * 25 && i >= (CurrentPage - 1) * 25
                              ? <tr key={i} onDoubleClick={() => editLoader(v)} className={'cursor-pointer'}>
                                <th scope="row">{v._id}</th>
                                <th>{v.name}</th>
                                <td>{v.url}</td>
                                <td>{v.startsCount}</td>
                              </tr>
                              : null
                          )
                        }
                      </tbody>
                    </table>
                    <ReactPaginate
                      previousLinkClassName={'btn btn-secondary previous'}
                      previousLabel={languagesTranslate[CurrentLanguage_G].loaderPage.previous}
                      nextLinkClassName={'btn btn-secondary next'}
                      nextLabel={languagesTranslate[CurrentLanguage_G].loaderPage.next}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={Math.ceil(loaders.length / 25)}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={(page) => handlePageChange(page.selected + 1)}
                      containerClassName={'pagination'}
                      activeClassName={'active'}
                      pageLinkClassName={'num'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    )

  }
);