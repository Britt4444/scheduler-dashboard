import React, { Component } from "react";
import Loading from './Loading';
import Panel from './Panel';

import classnames from "classnames";

const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];

class Dashboard extends Component {

  state = {
    loading: false,
    focused: null
  };

  //Instance method
  selectPanel(id) {
    this.setState(previousState => ({
      focused: previousState.focused !== null ? null : id
    }));
  }

  //Class property with arrow fn
  // selectPanel = id => {
  //   this.setState({
  //     focused: id
  //   });
  // };

  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem("focused"));

    if (focused) {
      this.setState({ focused });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }

  render() {
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
    });

    if (this.state.loading) {
      return <Loading />;
    }

    const panelItems = (this.state.focused ? data.filter(panelItem => this.state.focused === panelItem.id) : data)
      .map((panelItem) => (
        <Panel
          key={panelItem.id}
          label={panelItem.label}
          value={panelItem.value}
          onSelect={() => this.selectPanel(panelItem.id)}
        />
      ));

    return (
      <main className={dashboardClasses}>
        {panelItems}
      </main>
    );
  }
};

export default Dashboard;
