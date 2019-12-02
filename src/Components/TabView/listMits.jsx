import React from "react";
// import { connect } from "react-redux";
import "./listMits.css";

const ListMits = props => {
  return (
    <div class="grid-info item item-block item-md">
      <div item-start="">
        <div class="item-inner">
          <div class="input-wrapper">
            <div class="label label-md">
              <h1 class="overflow">MTC</h1>
              <h2 class="overflow owner">
                Current owner
                <span class="avatar">ben-avatar</span>
              </h2>
            </div>
          </div>
        </div>
        <div class="button-effect"></div>
      </div>
    </div>
  );
};

export default ListMits;
