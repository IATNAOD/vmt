import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import LoginPage from '../../pages/Login';
import HomePage from '../../pages/Home';

import Sidebar from '../Sidebar';

import { getCurrentAccountInfo, clearAllUserErrors } from './../../store/actions/user.actions'
import { getAllDataSets, clearAllDataSetsErrors } from './../../store/actions/datasets.actions'

const RestrictAccessRoute = ({ exact, path, render, forAuth = true, forRoles = [], role, auth, to, roleTo }) => {

  if (
    (forRoles.length > 0 && forRoles.indexOf(role) != -1 && ((!forAuth && !auth) || (forAuth && auth)))
    ||
    (forRoles.length == 0 && ((!forAuth && !auth) || (forAuth && auth)))
  ) {
    return <Route exact={exact} path={path} render={render} />
  } else if (path == '/login' && !auth) {
    return <Redirect to={to} />
  } else if (forRoles.length > 0 && forRoles.indexOf(role) == -1 && ((!forAuth && !auth) || (forAuth && auth))) {
    return <Redirect to={roleTo} />
  } else {
    return <Redirect to={to} />
  }
}

export default connect((s) => ({
  user: s.user.state,
  userError: s.user.error,
  datasetsError: s.datasets.error
}), {
  getCurrentAccountInfo,
  clearAllUserErrors,
  getAllDataSets,
  clearAllDataSetsErrors,
})(
  ({
    user,
    userError,
    datasetsError,

    getCurrentAccountInfo,
    clearAllUserErrors,
    getAllDataSets,
    clearAllDataSetsErrors,
  }) => {
    const history = useHistory()
    const [PathName, changePathName] = useState(location.pathname)

    useEffect(() => {
      return history.listen((location) => changePathName(location.pathname))
    }, [history])

    useEffect(() => {

      getCurrentAccountInfo()

    }, [])

    useEffect(() => {

      if (user?.googleId)
        getAllDataSets()

    }, [user?.googleId])

    // useEffect(() => {

    //   if (user && user.token && user.role != 'worker') {
    //     getCurrentAccountBalance(user.token)
    //     getSettingsUser(user.token)
    //     getBuilderUpdates(user.token)
    //     getOwnBuilder(user.token)
    //     getOwnWorkers(user.token)
    //     getOwnMarks(user.token)
    //     getOwnGrabbers(user.token)
    //     getOwnLoaders(user.token)
    //     getWorkersLogs({
    //       worker: workerLogsFilter.worker == 'all' ? null : workerLogsFilter.worker,
    //       logid: workerLogsFilter.logid,
    //       action: workerLogsFilter.action == 'all' ? null : workerLogsFilter.action,
    //       startDate: workerLogsFilter.startDate,
    //       endDate: workerLogsFilter.endDate,
    //       token: user.token,
    //     })
    //     getOwnTransactions({ token: user.token })
    //     getOwnAllLogs({
    //       ...allLogsFilter,
    //       country: allLogsFilter.country == 'all' ? '' : allLogsFilter.country,
    //       important: allLogsFilter.important == 'all' ? '' : allLogsFilter.important,
    //       mark: allLogsFilter.mark == 'all' ? '' : allLogsFilter.mark,
    //       token: user.token,
    //     })
    //     getOwnAllFiles({
    //       ...allFilesFilter,
    //       token: user.token,
    //     })
    //     getOwnAllPasswords({
    //       ...allPasswordsFilter,
    //       country: allPasswordsFilter.country == 'all' ? '' : allPasswordsFilter.country,
    //       token: user.token,
    //     })
    //     getOwnAllCards({
    //       ...allCardsFilter,
    //       country: allCardsFilter.country == 'all' ? '' : allCardsFilter.country,
    //       token: user.token,
    //     })
    //     getOwnAllForDownload({
    //       status: allForDownloadFilter.status == 'all' ? '' : allForDownloadFilter.status,
    //       token: user.token
    //     })
    //     getOwnAllSMTP({ token: user.token })
    //     getOwnAllCpanels({
    //       ...allCpanelsFilter,
    //       token: user.token
    //     })
    //     getOwnAllStats({
    //       ...allStatsFilter,
    //       token: user.token
    //     })
    //     getOwnAllWordpress({ token: user.token })
    //     getHomeStats(user.token)
    //   } else if (user && user.token && user.role == 'worker') {
    //     getOwnAllLogs({
    //       ...allLogsFilter,
    //       country: allLogsFilter.country == 'all' ? '' : allLogsFilter.country,
    //       important: allLogsFilter.important == 'all' ? '' : allLogsFilter.important,
    //       mark: allLogsFilter.mark == 'all' ? '' : allLogsFilter.mark,
    //       token: user.token,
    //     })
    //   }

    // }, [user?.role])

    useEffect(() => {

      if (userError) {
        toast.error(userError, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        clearAllUserErrors()
      }

    }, [userError])

    useEffect(() => {

      if (datasetsError) {
        toast.error(datasetsError, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        clearAllDataSetsErrors()
      }

    }, [datasetsError])

    return (
      <div className='text-body d-inline-block w-100'>
        <ToastContainer />

        {
          ['/login', '/registration', '/recovery', '/shared-stats'].indexOf(PathName) == -1 && user?.googleId
            ? <Sidebar PathName={PathName} />
            : null
        }

        <Switch>

          <RestrictAccessRoute
            exact={true}
            path="/login"
            render={() => <LoginPage />}
            forAuth={false}
            auth={user?.googleId}
            to={'/'}
          />

          <RestrictAccessRoute
            exact={true}
            path="/"
            render={() => <HomePage />}
            forAuth={true}
            auth={user?.googleId}
            to={'/login'}
          />

          <Route render={() => <HomePage />} />
        </Switch>

      </div>
    )

  }
);