import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import languagesTranslate from '../../common/languages'

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { baseUrl } from '../../common/config';
import { getOwnAllFiles, changeAllFilesFilter } from '../../store/actions/logs.actions'

export default connect((s) => ({
  user: s.user.state,
  allFiles: s.logs.files,
}), {
  getOwnAllFiles,
  changeAllFilesFilter
})(
  ({
    CurrentLanguage_G,

    user,
    allFiles,

    getOwnAllFiles,
    changeAllFilesFilter
  }) => {
    const location = useLocation();
    const [CurrentPage, changeCurrentPage] = useState(1)
    const [Files, changeFiles] = useState([])

    const handlePageChange = (page) => {

      changeCurrentPage(page);

      if (allFiles.state.length != allFiles.all && CurrentPage == (Files.length / 50) - 1)
        getOwnAllFiles({
          ...allFiles.filter,
          token: user.token,
          from: allFiles.state.length
        })

    }

    useEffect(() => {

      if (location.state?.id)
        changeAllFilesFilter({ name: 'id', value: location.state.id })

    }, [])

    useEffect(() => {

      let _allFiles = [];

      for (let i = 0; i < allFiles.state.length; i++)
        _allFiles = [..._allFiles, ...allFiles.state[i].files.map(v => ({ id: allFiles.state[i].id, value: v }))]

      if (allFiles.filter.file)
        _allFiles = _allFiles.filter(v => v.value == allFiles.filter.file)

      changeFiles(_allFiles)

    }, [allFiles.state])

    useEffect(() => {
      getOwnAllFiles({
        ...allFiles.filter,
        token: user.token
      })
    }, [allFiles.filter])

    return (
      <section className="content">
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].allFilesPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].allFilesPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].allFilesPage.pathItem2}</li>
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
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].allFilesPage.fiels}</strong></h2>
                  </div>
                  <div class="body">
                    <div class="row mb-2">
                      <div class="col-lg-2 pr-1 col-md-4">
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].allFilesPage.id} value={allFiles.filter.id} onChange={e => changeAllFilesFilter({ name: 'id', value: e.target.value })} />
                        </div>
                      </div>
                      <div class="col-lg-2 pr-1 pl-1 col-md-4">
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].allFilesPage.file} value={allFiles.filter.file} onChange={e => changeAllFilesFilter({ name: 'file', value: e.target.value })} />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="w-100 h-100 d-flex align-items-center">
                          <span className={'text-muted'}>{languagesTranslate[CurrentLanguage_G].allFilesPage.show(((CurrentPage - 1) * 50) + 1, CurrentPage * 50, Files.length)}</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <ReactPaginate
                          previousLinkClassName={'btn btn-secondary previous'}
                          previousLabel={languagesTranslate[CurrentLanguage_G].WorkersLogsPage.previous}
                          nextLinkClassName={'btn btn-secondary next'}
                          nextLabel={languagesTranslate[CurrentLanguage_G].WorkersLogsPage.next}
                          breakLabel={'...'}
                          breakClassName={'break-me'}
                          pageCount={Math.ceil(Files.length / 50)}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={(page) => handlePageChange(page.selected + 1)}
                          containerClassName={'pagination justify-content-end'}
                          activeClassName={'active'}
                          pageLinkClassName={'num'}
                        />
                      </div>
                    </div>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th></th>
                          <th>{languagesTranslate[CurrentLanguage_G].allFilesPage.id}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allFilesPage.file}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          Files.map((v, i) =>
                            i < CurrentPage * 50 && i >= (CurrentPage - 1) * 50
                              ? <tr key={i}>
                                <th scope="row" className={"text-center"}>
                                  <a href={`${baseUrl}logs/download-file?_id=${user._id}&id=${v.id}&file=${v.value}`}>
                                    <button class="btn btn-primary">
                                      <span class="btn-label">
                                        <i class="zmdi zmdi-download"></i>
                                      </span>
                                    </button>
                                  </a>
                                </th>
                                <td className={'text-center'}>
                                  <Link to={{
                                    pathname: '/logs',
                                    state: {
                                      id: v.id
                                    }
                                  }}>{v.id}</Link>
                                </td >
                                <td className={'text-center'}>{v.value}</td>
                              </tr>
                              : null
                          )
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section >
    )

  }
);