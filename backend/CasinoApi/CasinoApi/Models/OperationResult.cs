namespace CasinoApi.Models
{
    public class OperationResult
    {
        public bool Success { get; set; } = true;
        public List<string> Errors { get; set; } = new();

        public static OperationResult Fail(string error)
            => new() { Success = false, Errors = new() { error } };

        public static OperationResult Fail(List<string> errors)
            => new() { Success = false, Errors = errors };

        public static OperationResult Ok()
            => new ();
    }

    public class OperationResult<T> : OperationResult
    {
        public T Data { get; set; }
        public static OperationResult<T> Fail(string error)
            => new() { Success = false, Errors = new() { error } };

        public static OperationResult<T> Fail(List<string> errors)
            => new() { Success = false, Errors = errors };

        public static OperationResult<T> Ok(T data) 
            => new() { Data = data };
    }
}
