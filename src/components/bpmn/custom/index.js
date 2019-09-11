import Modeler from 'bpmn-js/lib/Modeler';

import {
  assign,
  isArray
} from 'min-dash';

import inherits from 'inherits';

import CustomModule from './custom-bpmn';


export default function CustomModeler(options) {
  Modeler.call(this, options);

  this._customElements = [];
}

inherits(CustomModeler, Modeler);

CustomModeler.prototype._modules = [].concat(
  CustomModeler.prototype._modules,
  [
    CustomModule
  ]
);

CustomModeler.prototype.createDiagram = function(id, name, done) {
	let initialDiagram = '<?xml version="1.0" encoding="UTF-8"?>' +
  '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                    'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                    'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
                    'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
                    'targetNamespace="http://bpmn.io/schema/bpmn" ' +
                    'id="Definitions_1">' +
    '<bpmn:process id="'+id+'" name="'+name+'" isExecutable="true">' +
      '<bpmn:startEvent id="StartEvent_1"/>' +
    '</bpmn:process>' +
    '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
      '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
        '<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">' +
          '<dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0"/>' +
        '</bpmndi:BPMNShape>' +
      '</bpmndi:BPMNPlane>' +
    '</bpmndi:BPMNDiagram>' +
  '</bpmn:definitions>';
  return this.importXML(initialDiagram, done);
};

/**
 * Add a single custom element to the underlying diagram
 *
 * @param {Object} customElement
 */
CustomModeler.prototype._addCustomShape = function(customElement) {

  this._customElements.push(customElement);

  var canvas = this.get('canvas'),
      elementFactory = this.get('elementFactory');

  var customAttrs = assign({ businessObject: customElement }, customElement);

  var customShape = elementFactory.create('shape', customAttrs);

  return canvas.addShape(customShape);

};

CustomModeler.prototype._addCustomConnection = function(customElement) {

  this._customElements.push(customElement);

  var canvas = this.get('canvas'),
      elementFactory = this.get('elementFactory'),
      elementRegistry = this.get('elementRegistry');

  var customAttrs = assign({ businessObject: customElement }, customElement);

  var connection = elementFactory.create('connection', assign(customAttrs, {
    source: elementRegistry.get(customElement.source),
    target: elementRegistry.get(customElement.target)
  }),
  elementRegistry.get(customElement.source).parent);

  return canvas.addConnection(connection);

};

/**
 * Add a number of custom elements and connections to the underlying diagram.
 *
 * @param {Array<Object>} customElements
 */
CustomModeler.prototype.addCustomElements = function(customElements) {

  if (!isArray(customElements)) {
    throw new Error('argument must be an array');
  }

  var shapes = [],
      connections = [];

  customElements.forEach(function(customElement) {
    if (isCustomConnection(customElement)) {
      connections.push(customElement);
    } else {
      shapes.push(customElement);
    }
  });

  // add shapes before connections so that connections
  // can already rely on the shapes being part of the diagram
  shapes.forEach(this._addCustomShape, this);

  connections.forEach(this._addCustomConnection, this);
};

/**
 * Get custom elements with their current status.
 *
 * @return {Array<Object>} custom elements on the diagram
 */
CustomModeler.prototype.getCustomElements = function() {
  return this._customElements;
};


function isCustomConnection(element) {
  return element.type === 'custom:connection';
}

import KeyboardMoveModule from '@bpmn/diagram-js/lib/navigation/keyboard-move';
import MoveCanvasModule from '@bpmn/diagram-js/lib/navigation/movecanvas';
import TouchModule from '@bpmn/diagram-js/lib/navigation/touch';
import ZoomScrollModule from '@bpmn/diagram-js/lib/navigation/zoomscroll';

import AlignElementsModule from '@bpmn/diagram-js/lib/features/align-elements';
import AutoPlaceModule from '@bpmn/bpmn-js/lib/features/auto-place';
import AutoResizeModule from '@bpmn/bpmn-js/lib/features/auto-resize';
import AutoScrollModule from '@bpmn/diagram-js/lib/features/auto-scroll';
import BendpointsModule from '@bpmn/diagram-js/lib/features/bendpoints';
import ConnectModule from '@bpmn/diagram-js/lib/features/connect';
import ConnectionPreviewModule from '@bpmn/diagram-js/lib/features/connection-preview';
import ContextPadModule from '@bpmn/bpmn-js/lib/features/context-pad';
import CopyPasteModule from '@bpmn/bpmn-js/lib/features/copy-paste';
import CreateModule from '@bpmn/diagram-js/lib/features/create';
import EditorActionsModule from '@bpmn/bpmn-js/lib/features/editor-actions';
import GridSnappingModule from '@bpmn/bpmn-js/lib/features/grid-snapping';
import KeyboardModule from '@bpmn/bpmn-js/lib/features/keyboard';
import KeyboardMoveSelectionModule from '@bpmn/diagram-js/lib/features/keyboard-move-selection';
import ModelingModule from '@bpmn/bpmn-js/lib/features/modeling';
import MoveModule from '@bpmn/diagram-js/lib/features/move';
import ResizeModule from '@bpmn/diagram-js/lib/features/resize';
import SnappingModule from '@bpmn/bpmn-js/lib/features/snapping';
import SearchModule from '@bpmn/bpmn-js/lib/features/search';

CustomModeler.prototype._interactionModules = [
  // non-modeling components
  KeyboardMoveModule,
  MoveCanvasModule,
  TouchModule,
  ZoomScrollModule
];

CustomModeler.prototype._modelingModules = [
  // modeling components
  AlignElementsModule,
  AutoPlaceModule,
  AutoScrollModule,
  AutoResizeModule,
  BendpointsModule,
  ConnectModule,
  ConnectionPreviewModule,
  ContextPadModule,
  CopyPasteModule,
  CreateModule,
  EditorActionsModule,
  GridSnappingModule,
  KeyboardModule,
  KeyboardMoveSelectionModule,
  MoveModule,
  ResizeModule,
  SnappingModule,
  SearchModule
];


// modules the modeler is composed of
//
// - viewer modules
// - interaction modules
// - modeling modules

CustomModeler.prototype._modules = [].concat(
  CustomModeler.prototype._modules,
  CustomModeler.prototype._interactionModules,
  CustomModeler.prototype._modelingModules);
