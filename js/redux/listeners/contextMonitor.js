// /* eslint-disable no-console */

// export default () => {
//   const state = store.getState();
//   if ( state.app.organization_context && state.hq.root.organization_data ) {
//     if ( state.app.organization_context.active_context_id !== state.hq.root.organization_data.id ) {
//       console.group( "Redux Store Listener" );
//       logRedux( "App active organization context changed and does not match Hq organization id!" );
//       console.groupEnd();
//     }
//   }
// };