<template>
    <div>
      <nav class="navbar navbar-expand navbar-light bg-light">
        <div class="nav navbar-nav">
            <a class="nav-item nav-link active" href="/">Curso de MEVN</a>
            <a class="nav-item nav-link" href="/tasks">Tasks</a>
        </div>
      </nav>
      <div class="container">
        <div class="row pt-5">
          <div class="col-md-5">
            <div class="card">
              <form @submit.prevent="sendTask">
                <div class="card-body">
                  <div class="form-group">
                    <input v-model="task.title" class="form-control" type="text" placeholder="Inserta una nueva tarea">
                  </div>
                  <div class="form-group">
                    <textarea v-model="task.description" cols="30" rows="10" class="form-control" placeholder="Inserta la descripcion de la tarea"></textarea>
                  </div>
                  <div class="form-group">
                    <template v-if="edit === false">
                      <button class="btn btn-primary btn-lg btn-block">Guardar!</button>
                    </template>
                    <template v-else>
                      <button class="btn btn-primary btn-lg btn-block">Actualizar!</button>
                    </template>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="col-md-7">
            <table class="table table-bordered">
              <thead>
                <th>Task</th>
                <th>Description</th>
              </thead>
              <tbody>
                <tr v-for="task of tasks">
                  <td>{{ task.title }}</td>
                  <td>{{ task.description }}</td>
                  <td>
                    <button class="btn btn-danger" @click="deleteTask(task._id)"> X </button>
                  </td>
                  <td>
                    <button class="btn btn-secondary" @click="updateTask(task._id)"> / </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    data(){
      return{
        task:{
          title:'',
          description:''
        },
        tasks:[],
        edit: false,
        taskToEdit:'',
      }
    },
    created(){
      this.getTasks();
    },
    methods:{
      getTasks(){
        fetch('/api/tasks')
          .then(res => res.json())
          .then(data => {
            this.tasks = data;
            console.log(this.tasks);
          })
      },
      sendTask(){
        if(this.edit === false){
          fetch('/api/tasks',{
          method:'POST',
          body:JSON.stringify(this.task),
          headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
            }
          }).then(res => res.json())
            .then(data => {this.getTasks()})
          this.task.title = '';
          this.task.description = '';
        }else{
          fetch('/api/tasks/'+this.taskToEdit,{
            method:'PUT',
            body:JSON.stringify(this.task),
            headers:{
              'Accept':'application/json',
              'Content-type':'application/json'
              }
          }).then(res => res.json())
          .then(data => {
            this.getTasks();
            this.task.title = '';
            this.task.description = '';
            this.taskToEdit = '';
            this.edit = false;
          })
        }
      },
      deleteTask(id){
        fetch('/api/tasks/'+id,{
          method: 'DELETE',
          headers: {
            'Accept':'application/json',
            'Content-type':'application/json'
          }
        }).then(res => res.json())
          .then(data => {this.getTasks();})
      },
      updateTask(id){
        fetch('api/tasks/'+id)
        .then(res => res.json())
        .then(data => {
          this.task.title = data.title;
          this.task.description = data.description;
          this.taskToEdit = data._id;
          this.edit = true;
        })
      },
    },
  }
</script>