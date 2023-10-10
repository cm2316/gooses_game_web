import EventEmitter from 'eventemitter3'

const EE = new EventEmitter()
export const on = EE.on.bind(EE)
export const off = EE.off.bind(EE)
export const emit = EE.emit.bind(EE)
export default { on, off, emit }
