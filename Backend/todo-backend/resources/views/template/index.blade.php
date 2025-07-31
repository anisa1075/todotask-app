 @extends('template.base')

 @section('content')
     <div class="d-sm-flex align-items-center justify-content-between mb-4">
         <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
         <ol class="breadcrumb">
             <li class="breadcrumb-item"><a href="./">Home</a></li>
             <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
         </ol>
     </div>

     <div class="row mb-3">
         <!-- Tasks -->
         <div class="col-xl-3 col-md-6 mb-4">
             <div class="card h-100">
                 <div class="card-body">
                     <div class="row align-items-center">
                         <div class="col mr-2">
                             <div class="h5 mb-0 font-weight-bold text-gray-800">Tasks</div>
                             <div class="mt-2 mb-0 text-muted text-xs">
                                 <span>10 Tasks</span>
                             </div>
                         </div>
                         <div class="col-auto">
                             <i class="fas fa-calendar fa-2x text-primary"></i>
                         </div>
                     </div>
                 </div>
             </div>
         </div>


         <!-- User -->
         <div class="col-xl-3 col-md-6 mb-4">
             <div class="card h-100">
                 <div class="card-body">
                     <div class="row align-items-center">
                         <div class="col mr-2">
                             <div class="h5 mb-0 font-weight-bold text-gray-800">User</div>
                             <div class="mt-2 mb-0 text-muted text-xs">
                                 <span>10 User</span>
                             </div>
                         </div>
                         <div class="col-auto">
                             <i class="fas fa-calendar fa-2x text-primary"></i>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>

     <!--Row-->
 @endsection
