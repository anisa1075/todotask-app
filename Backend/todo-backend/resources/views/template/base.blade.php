<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link href="{{ asset('img/logo/umt.png') }}" rel="icon">
    <title>@yield('title')</title>
    <link href="{{ asset('vendor/fontawesome-free/css/all.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/ruang-admin.min.css') }}" rel="stylesheet">

    {{-- font awesome --}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    {{-- FAVICON --}}
    <link rel="icon" href={{ asset('img1/logo.png') }} type="image/x-icon">

    <style type="text/css">
        .ck-editor__editable_inline {
            height: 450px;
        }
    </style>
</head>

<body id="page-top">
    <div id="wrapper">
        <!-- Sidebar -->
        @include('template.sidebar')
        <!-- Sidebar -->
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <!-- TopBar -->
                @include('template.top')
                <!-- Topbar -->

                <!-- Container Fluid-->
                <div class="container-fluid" id="container-wrapper">
                    @yield('content')
                    <!--Row-->

                    <!-- Modal Logout -->
                    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabelLogout" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabelLogout">Ohh No!</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <p>Are you sure you want to logout?</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-primary"
                                            data-dismiss="modal">Cancel</button>
                                        <button type="submit" class="btn btn-danger">Logout</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                <!---Container Fluid-->
            </div>
            <!-- Footer -->
            @include('template.footer')
            <!-- Footer -->
        </div>
    </div>

    <!-- Scroll to top -->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('vendor/jquery-easing/jquery.easing.min.js') }}"></script>
    <script src="{{ asset('js/ruang-admin.min.js') }}"></script>
    <script src="{{ asset('vendor/chart.js/Chart.min.js') }}"></script>
    <script src="{{ asset('js/demo/chart-area-demo.js') }}"></script>

    {{-- untuk chart --}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.2.0/highcharts.js"
        integrity="sha512-yQKwezlCfw1iUy19z7b7xp0Xz20rBfEUI9iN5jQ55e56WXzi4ZPQpiKsn0xtSUWIYuV2y6B+GsHgsLK8KAZrFQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="https://cdn.ckeditor.com/ckeditor5/40.0.0/classic/ckeditor.js"></script>

    @yield('ckEditor')
</body>

</html>
