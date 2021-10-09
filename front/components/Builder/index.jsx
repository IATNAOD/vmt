import React, { useState, useEffect } from 'react';
import SweetAlert from 'sweetalert-react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import languagesTranslate from '../../common/languages'

import { parseFullTime } from '../../common/utils';

import { baseUrl } from '../../common/config';

import { renewAccountSubscription, getCurrentAccountBalance } from '../../store/actions/user.actions'
import { createDeposit, getOwnTransactions } from '../../store/actions/transactions.actions'
import { getBuilderDownloadLink, downloadOwnBuilder, clearBuilderDownloadLink } from '../../store/actions/builder.actions'

export default connect((s) => ({
  user: s.user.state,
  depositLink: s.transactions.depositLink,
  subscriptionTypes: s.settings.state.subscriptionTypes,
  builderUpdates: s.builder.updates,
  builder: s.builder.state,
  downloadLink: s.builder.download,
}), {
  renewAccountSubscription,
  getCurrentAccountBalance,
  createDeposit,
  getOwnTransactions,
  getBuilderDownloadLink,
  downloadOwnBuilder,
  clearBuilderDownloadLink,
})(
  ({
    CurrentLanguage_G,

    user,
    depositLink,
    subscriptionTypes,
    builderUpdates,
    builder,
    downloadLink,

    renewAccountSubscription,
    getCurrentAccountBalance,
    createDeposit,
    getOwnTransactions,
    getBuilderDownloadLink,
    downloadOwnBuilder,
    clearBuilderDownloadLink,
  }) => {
    const [TopUpOpen, changeTopUpOpen] = useState(false)
    const [SubOpen, changeSubOpen] = useState(false)
    const [DidMount, changeDidMount] = useState(false)
    const [SubID, changeSubID] = useState(subscriptionTypes[0]._id)
    const [CurrentBuilderUpdatesPage, changeCurrentBuilderUpdatesPage] = useState(1)

    const copyDownloadLink = () => {

      if (builder.link)
        navigator.clipboard.writeText(`${baseUrl}builder/${builder.link}`).then(function () {
          toast.success(languagesTranslate[CurrentLanguage_G].builderPage.linkCopied, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, function (err) {
          toast.error(languagesTranslate[CurrentLanguage_G].builderPage.linkCopyError, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      else
        toast.info(languagesTranslate[CurrentLanguage_G].builderPage.generateLinkFirst, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

    }

    useEffect(() => {
      changeDidMount(true)
    }, [])

    useEffect(() => {
      if (DidMount) {
        toast.success(languagesTranslate[CurrentLanguage_G].builderPage.balanceUpdated, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (SubOpen)
          changeSubOpen(false)
        getOwnTransactions({ token: user.token })
      }
    }, [user.balance])

    useEffect(() => {
      if (DidMount) {
        toast.success(languagesTranslate[CurrentLanguage_G].builderPage.builderLinKUpdateed, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (SubOpen)
          changeSubOpen(false)
        getOwnTransactions({ token: user.token })
      }
    }, [builder.link])

    useEffect(() => {
      if (DidMount)
        location.href = depositLink;
    }, [depositLink])

    useEffect(() => {

      if (downloadLink) {

        let element = document.createElement('a');
        element.setAttribute('href', baseUrl + downloadLink);
        element.setAttribute('download', `${user._id}-builder.zip`);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);

        clearBuilderDownloadLink()
      }

    }, [downloadLink])

    return (
      <section className="content">
        <SweetAlert
          show={TopUpOpen}
          title={languagesTranslate[CurrentLanguage_G].builderPage.topUp}
          text={languagesTranslate[CurrentLanguage_G].builderPage.enterAmount}
          confirmButtonText={languagesTranslate[CurrentLanguage_G].builderPage.topUpButton}
          cancelButtonText={languagesTranslate[CurrentLanguage_G].builderPage.cancelButton}
          type="input"
          inputType="text"
          inputPlaceholder={languagesTranslate[CurrentLanguage_G].builderPage.amount}
          showCancelButton
          onConfirm={inputValue => {
            createDeposit({
              amount: parseFloat(inputValue),
              token: user.token,
            })
          }}
          onOutsideClick={() => changeTopUpOpen(false)}
          onCancel={() => changeTopUpOpen(false)}
        />
        <SweetAlert
          show={SubOpen}
          title={languagesTranslate[CurrentLanguage_G].builderPage.subscriptionTitle}
          text={languagesTranslate[CurrentLanguage_G].builderPage.renewSubscription}
          confirmButtonText={languagesTranslate[CurrentLanguage_G].builderPage.yesButton}
          cancelButtonText={languagesTranslate[CurrentLanguage_G].builderPage.noButton}
          showCancelButton
          onConfirm={() => {
            renewAccountSubscription({
              token: user.token,
              subID: SubID
            })
          }}
          onOutsideClick={() => changeSubOpen(false)}
          onCancel={() => changeSubOpen(false)}
        />
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].builderPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].builderPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].builderPage.pathItem2}</li>
                </ul>
                <button className="btn btn-primary btn-icon mobile_menu" type="button"><i
                  className="zmdi zmdi-sort-amount-desc"></i></button>
              </div>
            </div>
          </div>

          <div class="container-fluid">
            <div class="row clearfix">
              <div class="col-lg-6 col-md-12">
                <div class="card">
                  <div class="header">
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].builderPage.subscription}</strong></h2>
                  </div>
                  <div class="body p-3">
                    <form >
                      <div class="input-group mb-2">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].builderPage.balance}</span>
                        </div>
                        <input type="text" class="form-control" value={user.balance > 0 ? user.balance : '0.00000'} readOnly />
                        <div class="input-group-append">
                          <button onClick={() => getCurrentAccountBalance(user.token)} class="btn btn-outline-secondary p-2" type="button">{languagesTranslate[CurrentLanguage_G].builderPage.refreshBalanceButton}</button>
                        </div>
                      </div>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].builderPage.expiresAt}</span>
                        </div>
                        <input type="text" class="form-control" value={new Date() > new Date(user.subscription.expiresAt) ? languagesTranslate[CurrentLanguage_G].builderPage.expired : parseFullTime(user.subscription.expiresAt)} readOnly />
                      </div>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].builderPage.renewDate}</span>
                        </div>
                        <select class="custom-select" id="inputGroupSelect01" value={SubID} onChange={e => changeSubID(e.target.value)}>
                          {
                            subscriptionTypes.map((v, i) =>
                              <option key={i} value={v._id}>{v.name[CurrentLanguage_G]}</option>
                            )
                          }
                        </select>
                        <div class="input-group-append">
                          <button onClick={() => changeSubOpen(true)} class="btn btn-outline-secondary p-2" type="button">+ {languagesTranslate[CurrentLanguage_G].builderPage.renewButton}</button>
                          <button onClick={() => changeTopUpOpen(true)} class="btn btn-outline-secondary p-2" type="button">+ {languagesTranslate[CurrentLanguage_G].builderPage.topUpButton}</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="card">
                  <div class="header">
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].builderPage.download}</strong></h2>
                  </div>
                  <div class="body">
                    <button onClick={() => downloadOwnBuilder(user.token)} type="button" class="btn btn-success btn-lg w-100 mb-2">{languagesTranslate[CurrentLanguage_G].builderPage.downloadButton}</button>
                    <div className={'w-100'} >
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].builderPage.externalLink}</span>
                        </div>
                        <input type="text" class="form-control" value={builder.link ? `${baseUrl}builder/${builder.link}` : languagesTranslate[CurrentLanguage_G].builderPage.notGenerated} readOnly />
                        <div class="input-group-append">
                          <button onClick={copyDownloadLink} class="btn btn-outline-secondary p-2" type="button"><i class="zmdi zmdi-copy"></i></button>
                          <button onClick={() => getBuilderDownloadLink(user.token)} class="btn btn-outline-secondary p-2" type="button">{languagesTranslate[CurrentLanguage_G].builderPage.generateLinkButton}</button>
                        </div>
                      </div>
                    </div>
                    <div className="w-100 mt-2">
                      <span className="text-info mr-2">
                        <i class="zmdi zmdi-check"></i> {languagesTranslate[CurrentLanguage_G].builderPage.password}: {builder.password ? builder.password : languagesTranslate[CurrentLanguage_G].builderPage.passwordNotInstalled}
                      </span>
                      <span className={"text-success"}>
                        <i class="zmdi zmdi-check"></i> {languagesTranslate[CurrentLanguage_G].builderPage.builderVersion}: {builder.version ? builder.version : languagesTranslate[CurrentLanguage_G].builderPage.versionNotInstalled}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row clearfix">
              <div class="col-lg-12 col-md-12">
                <div class="card">
                  <div class="header">
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].builderPage.builderUPdates}</strong></h2>
                  </div>
                  <div class="body">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>{languagesTranslate[CurrentLanguage_G].builderPage.version}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].builderPage.changes}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].builderPage.date}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          builderUpdates.map((v, i) =>
                            i < CurrentBuilderUpdatesPage * 25 && i >= (CurrentBuilderUpdatesPage - 1) * 25
                              ? <tr key={i}>
                                <th scope="row">{v.versionName[CurrentLanguage_G]}</th>
                                <td>{v.description[CurrentLanguage_G]}</td>
                                <td>{parseFullTime(v.date)}</td>
                              </tr>
                              : null
                          )
                        }
                      </tbody>
                    </table>
                    <ReactPaginate
                      previousLinkClassName={'btn btn-secondary previous'}
                      previousLabel={languagesTranslate[CurrentLanguage_G].builderPage.previous}
                      nextLinkClassName={'btn btn-secondary next'}
                      nextLabel={languagesTranslate[CurrentLanguage_G].builderPage.next}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={Math.ceil(builderUpdates.length / 25)}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={(page) => changeCurrentBuilderUpdatesPage(page.selected + 1)}
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
      </section >
    )

  }
);