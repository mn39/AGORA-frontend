<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> default header </slot>
          </div>
          <div class="line"></div>

          <div class="modal-body">
            <slot name="body"> default body </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;

  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 20rem;
  margin: 0px auto;
  padding: 20px 30px;
  border-radius: 2px;

  background: #001e3d;
  border-radius: 0.75rem;

  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.5rem;
  color: white;
}

.modal-body {
  display: flex;
  flex: 1;
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
      * The following styles are auto-applied to elements with
      * transition="modal" when their visibility is toggled
      * by Vue.js.
      *
      * You can easily play with the modal transition by editing
      * these styles.
      */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.line {
  border: 1px solid #082e55;
  margin: 1rem 0;
}
</style>
