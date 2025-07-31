<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
@extends('template.base')

@section('title', 'Form Task')

@section('content')


    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card" style="padding: 1rem; margin-top:1rem;">

                    <form action="{{ route('tambah.task') }}" method="POST">
                        @csrf

                        <div class="mb-3">
                            <label for="judul" class="form-label">Judul Task</label>
                            <input type="text" id="judul" name="judul" class="form-control" required>
                        </div>

                        <div class="mb-3">
                            <label for="is_completed" class="form-label">Status</label>
                            <select class="form-select" aria-label="Default select example" id="is_completed"
                                name="is_completed">
                                <option selected>Status Task</option>
                                <option value="0">Not Yet</option>
                                <option value="1">Done</option>
                            </select>
                        </div>


                        <div class="mb-3" style="display: none">
                            <label for="user_id" class="form-label">User</label>
                            <input type="text" id="user_id" name="user_id" class="form-control" required value="{{ Auth::user()->id }}">
                        </div>


                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>

                </div>
            </div>
        </div>
    </div>




@endsection
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous">
</script>

@section('ckEditor')

    <script>
        ClassicEditor
            .create(document.querySelector('#desc'))
            .catch(error => {
                console.error(error);
            });
    </script>

@endsection
