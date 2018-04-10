export const isSelf = (props, monitor) => props.id === monitor.getItem().id;

export const hasSameParent = (props, monitor) =>
  props.parent === monitor.getItem().parent;

export const sharedHover = (props, monitor, component) => {
  console.log(props);
};
