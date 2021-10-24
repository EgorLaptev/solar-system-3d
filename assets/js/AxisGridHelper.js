'use strict';

export default class AxisGridHelper
{

    constructor(node)
    {

        const grid = new THREE.GridHelper(5, 1);
        grid.material.deepTest = false;
        grid.renderOrder = 1;
        node.add(grid);

        const axis = new THREE.AxisHelper(10);
        axis.material.deepTest = false;
        axis.renderOrder = 2;
        node.add(axis);

        this.grid = grid;
        this.axis = axis;
        this.visible = false;

    }

    get visible() {
        return this._visible;
    }
    set visible(v) {
        this._visible = v;
        this.grid.visible = v;
        this.axis.visible = v;
    }

}